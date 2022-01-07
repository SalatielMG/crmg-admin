import {IClientModel} from '@app/core/api/models/client/client.model';

export interface IClientsState {
    loading: boolean,
    clients: IClientModel[]
}

export class ClientsState implements IClientsState {
    clients: IClientModel[];
    loading: boolean;
    constructor(loading: boolean = false, clients: IClientModel[] = []) {
        this.loading = loading;
        this.clients = clients;
    }
}

export enum ClientsStateProperties {
    LOADING_PROPERTY = 'loading',
    CLIENTS_PROPERTY = 'clients'
}
