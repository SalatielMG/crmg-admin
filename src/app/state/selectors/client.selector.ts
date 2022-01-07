import { createSelector } from '@ngrx/store';
import {AppState} from '@app/state/app.state';
import {ClientsState} from '@app/core/api/models/client/client.state';

export const selectClientsFeature = (state: AppState) => state.clients;

export const selectListClients = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.clients
);

export const selectLoading = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.loading
);


export const selectCloseModalClient = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.closeModal
);
