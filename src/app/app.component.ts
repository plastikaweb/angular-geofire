import {Component, OnInit} from "@angular/core";
import {AngularFire} from "angularfire2";
import * as Geofire from "geofire";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  products = [];


  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    const gf: any = Geofire;
    const afRef = this.af.database;
    const locationsList = afRef.list('/locations');
    const gfRef = new gf(locationsList.$ref);
    locationsList
      .subscribe(data => this.products = data);

    // const fbRef = database().ref().push();
    // const geoFire = new GeoFire(fbRef);

    /* Callback method from the geolocation API which receives the current user's location */
    const geolocationCallback = (location) => {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      console.log('Retrieved user location: [' + latitude + ', ' + longitude + ']');

      const place = {
        name: 'place 1',
        description: 'description for place 1',
        pic: 'place1.jpg'
      };
      const places = afRef.list('/places');
      places.push(place)
        .then((data) => {
          const key = data.key;
          gfRef.set(key, [latitude, longitude]).then(function () {
            console.log('Current place ' + key + ' location has been added to GeoFire');

            // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
            // remove their GeoFire entry
            gfRef.child(key).onDisconnect().remove();

            console.log('Added handler to remove place ' + key + ' from GeoFire when you leave this page.');
          }).catch(function (error) {
            console.log('Error adding place ' + key + 's location to GeoFire');
          });
        });
    };

    /* Handles any errors from trying to get the user's current location */
    const errorHandler = (error) => {
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

    /* Uses the HTML5 geolocation API to get the current user's location */
    const getLocation = () => {
      if (typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined') {
        console.log('Asking user to get their location');
        navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
      } else {
        console.log('Your browser does not support the HTML5 Geolocation API, so this demo will not work.');
      }
    };

    getLocation();

  }
}
