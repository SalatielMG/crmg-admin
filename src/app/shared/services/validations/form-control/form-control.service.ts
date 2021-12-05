import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

    public getErrors = (formControl: AbstractControl): string[] => {
        if (!formControl) return [];
        if (formControl.errors != null && formControl.invalid) {
            return this.hasError(formControl);
        }
        return [];
    }

    private hasError(control: AbstractControl): string [] {
        let error = [];
        if (control.hasError('required')) {
            error.push('El campo es requerido');
        } else if (control.hasError('email')) {
            error.push('Porfavor ingrese un email valido');
        } else if (control.hasError('noConfirmNewPassword')) {
            error.push('Las contraseñas no coinciden');
        } else if (control.hasError('noSelectOption')) {
            error.push(control.errors.msj);
        } else if (control.hasError('noMultipleSelectOption')) {
            error.push(control.errors.msj);
        } else if (control.hasError('overflowMaxValue')) {
            error.push(control.errors.msj);
        } else if (control.hasError('noConfirmNewValue')) {
            error.push(control.errors.msj);
        } else if (control.hasError('noFormatOptionAnswer')) {
            error.push(control.errors.msj);
        } else if (control.hasError('errorSelectTopicsGroup')) {
            error.push(control.errors.msj);
        } else if (control.hasError('errorValidateDate')) {
            error.push(control.errors.msj);
        } else if (control.hasError('errorValidateTime')) {
            error.push(control.errors.msj);
        } else if (control.hasError('email')) {
            error.push('Ingrese un email valido');
        } else if (control.hasError('minlength')) {
            error.push(`Longitud mínima de ${control.getError('minlength').requiredLength} caracteres`);
        } else if (control.hasError('maxlength')) {
            error.push(`Longitud máxima de ${control.getError('maxlength').requiredLength} caracteres`);
        } else if (control.hasError('min')) {
            error.push(`Valor númerico mínimo de ${control.getError('min').min}`);
        } else if (control.hasError('max')) {
            error.push(`Valor númerico maximo de ${control.getError('max').max}`);
        } else if (control.hasError('pattern')) {
            error.push(this.hasErrorPattern(control.getError('pattern').requiredPattern).toString());
        }
        return error;
    }

    private hasErrorPattern(pattern: string): string {
        return 'Formato no valido'
        // let msj = '';
        // switch (pattern) {
        //     case `^${this.regexPassword}$`:
        //         return 'Contraseña mínima de 8 caracteres, al menos una letra, un número y un carácter especial';
        //     case `${REGEX.DATE}`:
        //         return 'Formato de Fecha invalida';
        //     case `${REGEX.TIME}`:
        //         return 'Formato de Hora invalida';
        //     default:
        //         const p = pattern.split(',');
        //         const min: number = Number(p[0][p[0].length - 1]);
        //         const max: number = Number(p[1][0]);
        //         msj = `Longitud maxima ${max} de caracteres`;
        //         // console.log('min', min);
        //         if (min > 1 && min !== max) {
        //             msj = `Longitud minima de ${min} y maxima de ${max} caracteres`;
        //         } else {
        //             msj = `Longitud minima y maxima de ${min} caracteres`;
        //         }
        //         return msj;
        // }
    }
}
