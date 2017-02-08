/* tslint:disable:no-unused-variable */

import {AppComponent} from './app.component';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';


describe('AppComponent: geofire simple exemple', () => {

    let component: AppComponent;
    let service: FirebaseService;


    beforeEach(() => {
        service = new FirebaseService(null);
        component = new AppComponent(service);
    });

    it('should render list', () => {
        let locations = [
            {g: 'xxxx', $key: 'tttt'},
            {g: 'dddd', $key: 'rrrr'},
            {g: 'ssss', $key: 'hhhh'}
        ];

        spyOn(service, 'getLocations').and.callFake(() => {
            return Observable.from([locations]);
        });
        component.ngOnInit();
        expect(component.locations).toBe(locations);

    });
});
