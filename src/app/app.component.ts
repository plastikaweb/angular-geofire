import {Component, OnInit} from '@angular/core';
import {AngularFire, AngularFireDatabase} from 'angularfire2';
import * as Geofire from 'geofire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'geofire app';
  locations = [];
  afRef: AngularFireDatabase;
  gfRef: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.afRef = this.af.database;
    const gf: any = Geofire;
    const locationsList = this.afRef.list('/locations');
    this.gfRef = new gf(locationsList.$ref);

    locationsList
      .subscribe(data => this.locations = data);
  }

  /* Callback method from the geolocation API which receives the current user's location */
  geolocationCallback = (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    console.log('Retrieved user location: [' + latitude + ', ' + longitude + ']');
    const gfRef = this.gfRef;
    const place = {
      name: 'place 1',
      description: 'description for place 1',
      pic: 'place1.jpg'
    };
    const places = this.afRef.list('/places');
    places.push(place)
      .then((data) => {
        const key = data.key;
        gfRef.set(key, [latitude, longitude]).then(function () {
          console.log('Current place ' + key + ' location has been added to GeoFire');
        }).catch(function (error) {
          console.error(error);
          console.log('Error adding place ' + key + ' location to GeoFire');
        });
      });
  };

  /* Handles any errors from trying to get the user's current location */
  errorHandler = (error) => {
    if (error.code === 1) {
      console.log('Error: PERMISSION_DENIED: User denied access to their location');
    } else if (error.code === 2) {
      console.log('Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached');
    } else if (error.code === 3) {
      console.log('Error: TIMEOUT: Calculating the user location too took long');
    } else {
      console.log('Unexpected error code');
    }
  };

  getLocationData = () => {
    if (typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined') {
      console.log('Asking user to get their location');
      navigator.geolocation.getCurrentPosition(this.geolocationCallback, this.errorHandler);
    } else {
      console.log('Your browser does not support the HTML5 Geolocation API, so this demo will not work.');
    }
  }
}
