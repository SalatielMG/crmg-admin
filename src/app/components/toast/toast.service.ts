import {Injectable} from '@angular/core';
import {FuseAlertService, FuseAlertType} from '../../../@fuse/components/alert';

export interface BodyAlert {
    title?: string,
    message: string
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private _name = 'message-toast';
    private _type: FuseAlertType = 'primary';
    private _body: BodyAlert = {
        message: '',
        title: ''
    }
    private TIMEOUT = 3000;

    get body(): BodyAlert {
        return this._body;
    }

    set body(value: BodyAlert) {
        this._body = value;
    }

    get type(): FuseAlertType {
        return this._type;
    }

    set type(value: FuseAlertType) {
        this._type = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    constructor(private fuseAlertService: FuseAlertService) {
    }

    public error = (message: string, title?: string) => {
        this.type = 'error';
        this.body = {
            message,
            title
        }
        this.handleShowToast();
    }

    public success = (message: string, title?: string) => {
        this.type = 'success';
        this.body = {
            message,
            title
        }
        this.handleShowToast();
    }

    public warning = (message: string, title?: string) => {
        this.type = 'warning';
        this.body = {
            message,
            title
        }
        this.handleShowToast();
    }

    private handleShowToast = () => {
        this.fuseAlertService.show(this.name, this.TIMEOUT);
    }

}
