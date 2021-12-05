import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlErrorComponent,
    ],
    declarations: [
      FormControlErrorComponent
    ]
})
export class SharedModule
{
}
