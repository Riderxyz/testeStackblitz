import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// services

import { DataService } from './services/data.service';
import { CentralRxJsService } from './services/centralRXJS.service';
import { ToastService } from './services/toast.service';
import { UpdateService } from './services/pwa.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/guard.service';


// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';



const AngularFire = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFireAuthModule,
  AngularFireMessagingModule,
  AngularFireStorageModule
];
const FormModules = [
  ReactiveFormsModule,
  FormsModule
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    PagesModule,
    MDBBootstrapModule.forRoot(),
    ComponentsModule,
    ...FormModules,
    // CDK
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    // AngularFire
    ...AngularFire,
    // Grid
    AgGridModule.withComponents([]),
    RouterModule,
    RoutingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [

    DataService,
    CentralRxJsService,
    ToastService,
    UpdateService,
    AuthService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
