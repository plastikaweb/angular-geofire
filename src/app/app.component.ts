import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {GeolocationService} from './geolocation.service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'geofire app';
    locations = [];

    constructor(private geolocService: GeolocationService,
                private firebaseService: FirebaseService) {}

    ngOnInit() {
        // this.afRef = this.af.database;
        // const gf: any = Geofire;
        // const locationsList = this.afRef.list('/locations');
        // this.gfRef = new gf(locationsList.$ref);
        this.getData().subscribe(data => this.locations = data);
    }

    setLocationData() {
        console.log('set location');
        // geolocate
        this.geolocService.getLocation()
            .subscribe(
                (location) => {
                    console.log(location);
                    this.firebaseService.geolocationCallback(location);
                },
                (err) => console.error(err.message)
            );

    }

    getData() {
        return this.firebaseService.getLocations();
    }
}
