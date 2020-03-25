using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CoastalShipping.Api.Extensions;

namespace CoastalShipping.Api
{
    public class Startup
    {
        public static string ScopeRead;
        public static string ScopeWrite;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = Configuration["Authentication:AzureAdB2C:Authority"];
                options.Audience = Configuration["Authentication:AzureAdB2C:Audience"];
                options.IncludeErrorDetails = true;
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = OnTokenValidated,
                    OnAuthenticationFailed = OnAuthenticationFailed
                };
            });

            services.AddSwaggerDocumentation();

            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            ScopeRead = Configuration["Authentication:AzureAdB2C:ScopeRead"];
            ScopeWrite = Configuration["Authentication:AzureAdB2C:ScopeWrite"];

            app.UseSwaggerDocumentation();

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private Task OnTokenValidated(TokenValidatedContext context)
        {
            // Grab the raw value of the token, and store it as a claim so we can retrieve it again later in the request pipeline
            if (context.SecurityToken is JwtSecurityToken token)
            {
                if (context.Principal.Identity is ClaimsIdentity identity)
                {
                    identity.AddClaim(new Claim("access_token", token.RawData));
                }
            }

            return Task.CompletedTask;
        }

        // For debugging
        private Task OnAuthenticationFailed(AuthenticationFailedContext context)
        {
            var errorMessage = $"AuthenticationFailed: {context.Exception.Message}";
            context.Response.ContentLength = errorMessage.Length;
            context.Response.Body.Write(Encoding.UTF8.GetBytes(errorMessage), 0, errorMessage.Length);
            return Task.CompletedTask;
        }
    }
}
