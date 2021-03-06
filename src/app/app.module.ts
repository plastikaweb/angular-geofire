import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from "./firebase.config";
import {FirebaseService} from './firebase.service';
import {GeolocationService} from './geolocation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [GeolocationService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
