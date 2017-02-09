/* tslint:disable:no-unused-variable */

import {AppComponent} from './app.component';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {ComponentFixture, TestBed, inject, async} from '@angular/core/testing';
import {AngularFireDatabase, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from './firebase.config';
import {MockBackend} from '@angular/http/testing';


describe('AppComponent: geofire simple exemple', () => {

    let component: AppComponent;
    let service: FirebaseService;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                MockBackend,
                {provide: FirebaseService, useClass: MockBackend}
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    beforeEach(inject([FirebaseService], (fs: FirebaseService) => {
        service = fs;
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should render list', async(() => {
        let locations = [
            {g: 'xxxx', $key: 'tttt'},
            {g: 'dddd', $key: 'rrrr'},
            {g: 'ssss', $key: 'hhhh'}
        ];

        component.getData().subscribe(result => {
           expect(result).toBe(locations);
        });


    }));

    // it('should add an item to the list', () => {
    //     component.setLocationData();
    //     fixture.detectChanges();
    //     expect(component.locations.length).toBe(1);
    // });
});
