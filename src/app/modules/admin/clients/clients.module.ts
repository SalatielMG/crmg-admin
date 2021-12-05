import {NgModule} from '@angular/core';
import {ClientsComponent} from './clients.component';
import {Route, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {FuseScrollbarModule} from '../../../../@fuse/directives/scrollbar';
import { ModalComponent } from './modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '@app/shared/shared.module';
import {TranslocoModule} from '@ngneat/transloco';
import {ClientsResolver} from '@app/modules/admin/clients/clients.resolver';
import {SourceOfTruthInitiate} from 'gentleman-state-manager/lib/models/source-of-truth';
import {StoreKeys} from '@app/app.state';
import {IClientsState, ClientsStateProperties, ClientsState} from '@app/modules/admin/clients/IClientsState';
import {GentlemanStateService} from 'gentleman-state-manager';

const clientsModule: Route[] = [
    {
        path: '',
        component: ClientsComponent
    }
];

const clientsSourceOfTruthInitiate: SourceOfTruthInitiate[] = [
    {
        key: StoreKeys.CLIENTS_STATE,
        state: new ClientsState(),
        stateProperties: ClientsStateProperties
    }
];

@NgModule({
    declarations: [
        ClientsComponent,
        ModalComponent
    ],
    imports: [
        RouterModule.forChild(clientsModule),
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDividerModule,
        FuseCardModule,
        FuseScrollbarModule,
        SharedModule,
        TranslocoModule
    ]
})
export class ClientsModule {
    constructor(gentlemanStateService: GentlemanStateService) {
        // gentlemanStateService.getEntity('').setObservableValues()
        clientsSourceOfTruthInitiate.forEach((state) =>
            gentlemanStateService.createObservable(
                state.key,
                state.state,
                state.stateProperties
            )
        );
    }
}
