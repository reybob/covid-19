import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphicsComponent } from './graphics/graphics.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphicsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
