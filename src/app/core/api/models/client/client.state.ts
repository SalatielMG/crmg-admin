import {ClientModel} from './client.model';

export interface ClientsState {
    closeModal: boolean,
    loading: boolean,
    clients: ReadonlyArray<ClientModel>
}
