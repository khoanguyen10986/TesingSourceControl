import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicChildFormComponent } from './components/dynamic-child-form/dynamic-child-form.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicChildFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class CoreModule { }
