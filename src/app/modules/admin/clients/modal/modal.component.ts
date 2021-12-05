import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LogService} from '@app/core/log/log.service';
import {FormControlService} from '@app/shared/services/validations/form-control/form-control.service';
import {ClientModel} from '@app/core/api/models/client.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IModalDataCrud} from '@app/core/api/interfaces/modal.interface';
import {ClientService} from '@app/core/api/services/client/client.service';
import {ToastService} from '@app/components/toast/toast.service';
import {GentlemanStateService} from 'gentleman-state-manager';
import {StoreKeys} from '@app/app.state';
import {ClientsState, ClientsStateProperties} from '@app/modules/admin/clients/IClientsState';

interface responseClient {
    message: string,
    client: ClientModel
}

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    public clientFormGroup: FormGroup;

    constructor(
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private logService: LogService,
        public formControlValidationService: FormControlService,
        @Inject(MAT_DIALOG_DATA) public data: IModalDataCrud<ClientModel>,
        private clientService: ClientService,
        private toastService: ToastService,
        private gentlemanStateService: GentlemanStateService
    ) {
        this.buildForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        if (this.data.action === 'Edit') {
            this.buildForm(this.data.data);
        }
        // console.log('this.data', this.data);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public submit = (event: Event) => {
        event.preventDefault();
        if (this.clientFormGroup.invalid) return;
        this.logService.info(this.clientFormGroup.value);
        this.clientService.create(this.clientFormGroup.value)
            .subscribe((response: responseClient) => {
               this.addNewClientToState(response.client);
               this.toastService.success(response.message);
               this.dialog.closeAll();
            }, error => {
                console.log('error to create client', error);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private buildForm = (client = new ClientModel()) => {
        this.clientFormGroup = this.formBuilder.group({
            name: [client.name, Validators.required],
            firstName: [client.firstName, Validators.required],
            lastName: [client.lastName, Validators.required],
            address: [client.address, Validators.required],
            email: [client.email, Validators.email],
            phoneNumber: [client.phoneNumber, [Validators.required, Validators.maxLength(10)]],
        });
    }

    private addNewClientToState = (client: ClientModel) => {
        let clients = this.gentlemanStateService
            .getEntity(StoreKeys.CLIENTS_STATE).getPropertyFromState(ClientsStateProperties.CLIENTS_PROPERTY);
        this.gentlemanStateService
            .getEntity(StoreKeys.CLIENTS_STATE)
            .setObservableValues(
                <ClientsState>{
                    loading: false,
                    clients: [
                        ...clients,
                        client
                    ]
                },
                null,
                true
            );
    }

}
