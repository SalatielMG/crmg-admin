import {Injectable} from '@angular/core';
import {environment} from '@environmentsApp/environment';

const {debugLog} = environment;

export type LogLevel = 'debug' | 'error' | 'info' | 'warn';

@Injectable({
    providedIn: 'root'
})
export class LogService{
    level: LogLevel;

    debug(...args: any[]): void {
        this.level = 'debug';
        this.handleLog(args);
    }

    error(...args: any[]): void {
        this.level = 'error';
        this.handleLog(args);
    }

    info(...args: any[]): void {
        this.level = 'info';
        this.handleLog(args);
    }

    warn(...args: any[]): void {
        this.level = 'warn';
        this.handleLog(args);
    }

    private handleLog = (args: any[]) => {
        if (debugLog) {
            switch (this.level) {
                case 'debug':
                    console.debug(args);
                    break;
                case 'error':
                    console.error(args);
                    break;
                case 'info':
                    console.info(args);
                    break;
                case 'warn':
                    console.warn(args);
                    break;
            }
        }
    }

}
