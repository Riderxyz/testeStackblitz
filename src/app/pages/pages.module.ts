import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UsuariosComponent } from './usuarios/usuarios.component';

const Material = [
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule
]

const FormModules = [
  ReactiveFormsModule,
  FormsModule
]
@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ComponentsModule,
    HttpClientModule,
    ...Material,
    ...FormModules
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
  ],
  exports: [
    DashboardComponent,
  ],
  providers: [],
})
export class PagesModule { }
