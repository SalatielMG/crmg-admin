import {ClientModel} from '@app/core/api/models/client/client.model';

export interface ResponseClient {
    message: string,
    client: ClientModel
}
