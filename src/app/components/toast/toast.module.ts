import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './toast.component';
import {FuseAlertModule} from '../../../@fuse/components/alert';


@NgModule({
    declarations: [
        ToastComponent
    ],
    imports: [
        CommonModule,
        FuseAlertModule
    ],
    exports: [
        ToastComponent
    ]
})
export class ToastModule {
}
