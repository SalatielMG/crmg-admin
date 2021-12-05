import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormControlService} from '../../services/validations/form-control/form-control.service';

@Component({
    selector: 'form-control-error',
    templateUrl: './form-control-error.component.html',
    styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent implements OnInit {
    @Input() formControl: AbstractControl = null;

    constructor(private formControlValidationService: FormControlService) {
    }

    ngOnInit(): void {

    }

    get errors () {
        if (!this.formControl) return [];
        return this.formControlValidationService.getErrors(this.formControl);
    }




}
