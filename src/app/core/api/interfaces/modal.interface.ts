import {Action} from '@globals';
import {ClientModel} from '@app/core/api/models/client.model';

export interface  IModalDataCrud<T> {
    action: Action,
    data?: ClientModel
}
