import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientService} from '@app/core/api/services/client/client.service';

@Injectable({
    providedIn: 'root'
})
export class ClientsResolver implements Resolve<any>
{
    constructor(
       private clientService: ClientService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.clientService.getClients();
    }

}
