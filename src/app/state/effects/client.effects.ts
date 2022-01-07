import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {ClientService} from '@app/core/api/services/client/client.service';
import {createClient, createdClient, loadClients, loadedClients} from '@app/state/actions/clients.actions';
import {ToastService} from '@app/components/toast/toast.service';

@Injectable()
export class ClientEffects {

    loadClients$ = createEffect(() => this.actions$.pipe(
        ofType(loadClients),
        mergeMap(() => this.clientService.getClients()
            .pipe(
                map(clients => loadedClients({ clients })),
                catchError(() => EMPTY)
            ))
        )
    );

    createClient$ = createEffect(() => this.actions$.pipe(
        ofType(createClient), // Launch action
        mergeMap((action) => this.clientService.create(action.client)
            .pipe(
                map(({ client, message }) => {
                    this.toastService.success(message);
                    return createdClient({ client })
                }),
                catchError(() => EMPTY)
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private clientService: ClientService,
        private toastService: ToastService
    ) {}
}
