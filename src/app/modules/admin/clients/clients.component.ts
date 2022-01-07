import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '@app/modules/admin/clients/modal/modal.component';
import {Action} from '@globals';
import {ClientService} from '@app/core/api/services/client/client.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ClientModel} from '@app/core/api/models/client/client.model';
import {GentlemanStateService} from 'gentleman-state-manager';
import {StoreKeys} from '@app/app.state';
import {ClientsStateProperties, ClientsState} from '@app/modules/admin/clients/IClientsState';
import {LogService} from '@app/core/log/log.service';
import {Store} from '@ngrx/store';
import {loadClients, loadedClients} from '@app/state/actions/clients.actions';
import {selectListClients, selectLoading} from '@app/state/selectors/client.selector';
import {AppState} from '@app/state/app.state';

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
    public loading$: Observable<boolean> = new Observable();
    public clients$: Observable<ReadonlyArray<ClientModel>> = new Observable();

    private onDestroy$: Subject<any> = new Subject();

    constructor(
        public dialog: MatDialog,
        private clientsService: ClientService,
        private gentlemanStateService: GentlemanStateService,
        private logService: LogService,
        private store: Store<AppState>
        ) {
        // this.gentlemanStateService
        //     .getEntity(StoreKeys.CLIENTS_STATE)
        //     .getObservable()
        //     .pipe(
        //         takeUntil(this.onDestroy$)
        //     ).subscribe((clientState: ClientsState) => {
        //         this.clientState = clientState
        //     });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.loading$ = this.store.select(selectLoading);
        this.clients$ = this.store.select(selectListClients);
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
        this.store.dispatch(loadClients());
        // this.clientsService.getClients()
        //     .pipe(takeUntil(this.onDestroy$))
        //     .subscribe((clients: ClientModel[]) => {
        //         this.store.dispatch(loadedClients({ clients }));
        //     }, error => {
        //         this.store.dispatch(loadedClients({ clients: [] }));
        //     });
    }

}
