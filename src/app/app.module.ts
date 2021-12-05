import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import {LogService} from './core/log/log.service';
import {ToastModule} from './components/toast/toast.module';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {PaginatorIntlService} from './core/paginator/paginator-intl.service';
import {SourceOfTruthInitiate} from 'gentleman-state-manager/lib/models/source-of-truth';
import {GentlemanStateManagerModule} from 'gentleman-state-manager';

const sourceOfTruthInititate: SourceOfTruthInitiate[] = [
    // {
    //     key:
    // }
];

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        // FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        ToastModule,

        GentlemanStateManagerModule.forRoot(sourceOfTruthInititate)
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        LogService,
        {
            provide: MatPaginatorIntl,
            useClass: PaginatorIntlService
        }
    ]
})
export class AppModule
{
}
