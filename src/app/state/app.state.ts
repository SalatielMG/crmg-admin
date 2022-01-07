import {ActionReducerMap} from '@ngrx/store';
import {clientsReducer} from '@app/state/reducers/client.reducer';
import {ClientsState} from '@app/core/api/models/client/client.state';

export interface AppState {
    clients: ClientsState
}


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    clients: clientsReducer
}
