import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from '@environmentsApp/environment';
import {PREFIX_API} from '@globals';
import {LogService} from '../log/log.service';
import {ToastService} from '@app/components/toast/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
        private logger: LogService,
        private _authService: AuthService,
        private toastService: ToastService
    )
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.

        // if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        // console.log('this._authService.accessToken ', this._authService.accessToken );
        if ( this._authService.accessToken )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });
        }
        let requestUrl = req.url;
        if (requestUrl.includes(PREFIX_API)) {
            requestUrl = requestUrl.replace(PREFIX_API, environment.urlApi);
            newReq = newReq.clone({
                url: requestUrl
            });
        }

        // Response
        return next.handle(newReq).pipe(
            retry(1),
            catchError((error) => {

                this.logger.error(error);
                if ([401, 403].includes(error.status)) {
                    this._authService.signOut();
                    // location.reload();
                }
                this.toastService.error(error.error.message, 'Error');
                return throwError(error);
            })
        );
    }
}
