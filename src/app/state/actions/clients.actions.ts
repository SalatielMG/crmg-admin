import { createAction, props } from '@ngrx/store';
import {ClientModel, IClientModel} from '@app/core/api/models/client/client.model';

// TODO: 1.- loadClients

export const loadClients = createAction(
    '[Client List] Load clients'
);

export const loadedClients = createAction(
    '[Client List] Loaded success',
    props<{ clients: ClientModel[] }>()
);

export const createClient = createAction(
    '[Client List] Create client',
    props<{ client: IClientModel }>()
)

export const createdClient = createAction(
    '[Client List] Created client success',
    props<{ client: ClientModel }>()
)
