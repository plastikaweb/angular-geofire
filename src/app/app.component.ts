import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {IPlace} from './place';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'geofire app';
    locations = [];

    constructor(private firebaseService: FirebaseService) {}

    ngOnInit() {
        // this.afRef = this.af.database;
        // const gf: any = Geofire;
        // const locationsList = this.afRef.list('/locations');
        // this.gfRef = new gf(locationsList.$ref);

        this.firebaseService.getLocations()
            .subscribe(data => this.locations = data);
    }

    // setLocationData() {
    //     this.firebaseService.addLocation();
    // }
}
