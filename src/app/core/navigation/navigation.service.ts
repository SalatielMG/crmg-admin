import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Navigation} from 'app/core/navigation/navigation.types';
import {FuseNavigationItem} from '../../../@fuse/components/navigation';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        const navData: FuseNavigationItem[] = [
            {
                id      : 'reports',
                title   : 'Reportes',
                type    : 'group',
                icon    : 'heroicons_outline:home',
                children: [
                    {
                        id: 'dashboard',
                        title: 'Dashboard',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/dashboard'
                    }
                ]
            },
            {
                id      : 'pages',
                type    : 'group',
                icon    : 'heroicons_outline:home',
                children: [
                    {
                        id: 'clients',
                        title: 'Clientes',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/clients'
                    },
                    {
                        id: 'installations',
                        title: 'Instalaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/instalations'
                    },
                    {
                        id: 'payments',
                        title: 'Pagos',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/payments'
                    }
                ]
            },
        ];
        const nav: Navigation = {
            compact: navData,
            default: navData,
            futuristic: navData,
            horizontal: navData,
        }
        console.log('navData', navData);
        this._navigation.next(nav);

        return of(nav);


        return new Observable<Navigation>((observer) => {
            setTimeout(() => {
                observer.next(nav);
            }, 2000)
        }).pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        )
        // return this._httpClient.get<Navigation>('api/common/navigation').pipe(
        //     tap((navigation) => {
        //         this._navigation.next(navigation);
        //     })
        // );
    }
}
