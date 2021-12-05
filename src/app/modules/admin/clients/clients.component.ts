import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '@app/modules/admin/clients/modal/modal.component';
import {Action} from '@globals';
import {ClientService} from '@app/core/api/services/client/client.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ClientModel} from '@app/core/api/models/client.model';
import {GentlemanStateService} from 'gentleman-state-manager';
import {StoreKeys} from '@app/app.state';
import {ClientsStateProperties, ClientsState} from '@app/modules/admin/clients/IClientsState';
import {LogService} from '@app/core/log/log.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    encapsulation  : ViewEncapsulation.None,
})
export class ClientsComponent implements OnInit, OnDestroy {
    public screenWidth: any;
    public screenHeight: any;
    public clientState = new ClientsState();

    private onDestroy$: Subject<any> = new Subject();

    constructor(
        public dialog: MatDialog,
        private clientsService: ClientService,
        private gentlemanStateService: GentlemanStateService,
        private logService: LogService
        ) {
        this.gentlemanStateService
            .getEntity(StoreKeys.CLIENTS_STATE)
            .getObservable()
            .pipe(
                takeUntil(this.onDestroy$)
            ).subscribe((clientState: ClientsState) => {
                this.clientState = clientState
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.getClients();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Listeners
    // -----------------------------------------------------------------------------------------------------

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    openDialog(action: Action) {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: this.screenWidth > 400 ? '60%' : '100%',
            minWidth: this.screenWidth > 400 ? '400px' : '100%',
            data: {
                action
            }
        });
        // dialogRef.afterClosed()
        //     .pipe(
        //         switchMap((result: any) => {
        //             return this.clientsService.getClients();
        //         })
        //     );
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('result ofter close client modal', result);
        //
        // });
    }

    getClients = () => {
        this.gentlemanStateService
            .getEntity(StoreKeys.CLIENTS_STATE)
            .setObservableValues(true, ClientsStateProperties.LOADING_PROPERTY, true);
        this.clientsService.getClients()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((clients: ClientModel[]) => {
                this.setClients(new ClientsState(true, clients), true);
            }, error => {
                this.setClients(new ClientsState(true), true);
            });
    }

    private setClients = (clientsState: ClientsState, emit?: boolean) => {
        this.gentlemanStateService
            .getEntity(StoreKeys.CLIENTS_STATE)
            .setObservableValues(clientsState, null, emit);
    }

}
