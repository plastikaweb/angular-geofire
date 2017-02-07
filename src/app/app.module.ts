import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCG6v_5Gv0PR0bfitaYjjL5-vkoVCKx8k4",
  authDomain: "tutsplus-products.firebaseapp.com",
  databaseURL: "https://tutsplus-products.firebaseio.com",
  storageBucket: "tutsplus-products.appspot.com",
  messagingSenderId: "94058140695"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
