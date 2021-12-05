import {Injectable} from '@angular/core';
import {ClientModel, IClientModel} from '@app/core/api/models/client.model';
import {HttpClient} from '@angular/common/http';
import {PREFIX_API} from '@globals';
import {Observable, ReplaySubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    // private _clients: ReplaySubject<ClientModel[]> = new ReplaySubject<ClientModel[]>(1);

    constructor(private httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // get clients$(): Observable<ClientModel[]> {
    //     return this._clients.asObservable();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public getClients = (): Observable<ClientModel[]> => {
        return this.httpClient.get<ClientModel[]>(`${PREFIX_API}/client`)
            .pipe(
                map((response: any) => {
                    return response.clients as ClientModel[];
                })
            )
    }

    public get = () => {

    }

    public create = (client: IClientModel) => {
        return this.httpClient.post(`${PREFIX_API}/client`, { ... client });
    }

    public update = () => {

    }

    public delete = () => {

    }

}
