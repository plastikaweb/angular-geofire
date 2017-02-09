import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

const GEOLOCATION_ERRORS = {
    unsupportedBrowser: 'Your browser does not support the HTML5 Geolocation API',
    permissionDenied: 'Error: PERMISSION_DENIED: User denied access to their location',
    positionUnavailable: 'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached',
    timeout: 'Error: TIMEOUT: Calculating the user location too took long',
    unexpected: 'Unexpected error'
};

@Injectable()
export class GeolocationService {

    public getLocation(opts: any = {}): Observable<any> {
        console.log('gettt');
        const SUBJECT = new Subject<any>();

        if (typeof window.navigator !== 'undefined' && typeof window.navigator.geolocation !== 'undefined') {
            console.log('Asking user to get their location');
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    SUBJECT.next(position);
                },
                (error) => {
                    console.log(error);
                    switch (error.code) {
                        case 1:
                            SUBJECT.error(GEOLOCATION_ERRORS.permissionDenied);
                            break;
                        case 2:
                            SUBJECT.error(GEOLOCATION_ERRORS.positionUnavailable);
                            break;
                        case 3:
                            SUBJECT.error(GEOLOCATION_ERRORS.timeout);
                            break;
                        default:
                            SUBJECT.error(GEOLOCATION_ERRORS.unexpected);
                    }
                },
                opts);
        } else {
            SUBJECT.error(GEOLOCATION_ERRORS.unsupportedBrowser);
        }

        SUBJECT.complete();
        return SUBJECT.asObservable();

    }

}
