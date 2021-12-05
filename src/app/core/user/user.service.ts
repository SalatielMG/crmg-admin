import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import {PREFIX_API} from '../../../globals';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        // const user = {
        //     id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        //     name  : 'Brian Hughes',
        //     email : 'hughes.brian@company.com',
        //     avatar: 'assets/images/avatars/brian-hughes.jpg',
        //     status: 'online'
        // }
        // console.log('user data', user);
        // this._user.next(user);
        // return of(user);
        //
        // return new Observable<User>((subscribe) => {
        //     // this._user.next(user)
        //     setTimeout(() => {
        //         subscribe.next(user);
        //     }, 2000)
        // }).pipe(
        //     tap((user) => {
        //         this._user.next(user);
        //     })
        // );
        return this._httpClient.get<User>(`${PREFIX_API}/common/personnel/user`).pipe(
                tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
