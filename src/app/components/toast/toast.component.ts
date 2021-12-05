import {Component, OnInit} from '@angular/core';
import {BodyAlert, ToastService} from './toast.service';
import {FuseAlertType} from '../../../@fuse/components/alert';

@Component({
    selector: 'toast-messages',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    get body(): BodyAlert {
        return this.toastService.body;
    }

    get type(): FuseAlertType {
        return this.toastService.type;
    }

    get name(): string {
        return this.toastService.name;
    }

    constructor(private toastService: ToastService) {
    }

    ngOnInit(): void {
    }

}
