import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import * as Geofire from 'geofire';
import {IPlace} from './place';

@Injectable()
export class FirebaseService {

    constructor(private db: AngularFireDatabase) {}

    getLocations() {
        return this.db.list('/locations');
    }

    // /* Callback method from the geolocation API which receives the current user's location */
    geolocationCallback = (location) => {
        const place: IPlace = {
            name: 'place 1',
            description: 'description for place 1',
            pic: 'place1.jpg'
        };

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        console.log('Retrieved user location: [' + latitude + ', ' + longitude + ']');
        const gf: any = Geofire;
        const locationsList = this.db.list('/locations');
        const gfRef = new gf(locationsList.$ref);

        const places = this.db.list('/places');
        return places.push(place)
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


}
