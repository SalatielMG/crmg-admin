import {Action} from '@globals';
import {ClientModel} from '@app/core/api/models/client/client.model';

export interface  IModalDataCrud<T> {
    action: Action,
    data?: ClientModel
}
