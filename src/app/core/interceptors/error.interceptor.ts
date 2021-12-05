import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {LogService} from '../log/log.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastService: ToastrService,
        private logger: LogService,
        private autService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return undefined;
        return next.handle(req)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    console.error('error interceptor', error);
                    this.logger.error(error);
                    if ([401, 403].includes(error.status)) {
                        this.autService.signOut();
                        location.reload();
                    }
                    this.toastService.error(error.message, 'Error');
                    return throwError(error.error);
                })
            )
    }

}
