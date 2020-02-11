import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { GridComponent } from './grid/grid.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';
// AG-GRID
import { AgGridModule } from 'ag-grid-angular';
import { ModalCadastroComponent } from './modal-cadastro/modal-cadastro.component';
import { ModalEdicaoComponent } from './modal-edicao/modal-edicao.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const Material =
[
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatSidenavModule
];

const FormModules = [
  ReactiveFormsModule,
  FormsModule
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...Material,
    MDBBootstrapModule.forRoot(),
    // Grid
    AgGridModule.withComponents([]),
    ...FormModules
  ],
  declarations: [
    FooterComponent,
    StatsCardComponent,
    GridComponent,
    HeaderComponent,
    SidebarComponent,
    ModalCadastroComponent,
    ModalEdicaoComponent,
  ],
  entryComponents: [
    ModalCadastroComponent,
    ModalEdicaoComponent,
  ],
  exports: [
    FooterComponent,
    StatsCardComponent,
    GridComponent,
    HeaderComponent,
    SidebarComponent,
    ...Material,
  ],
})
export class ComponentsModule { }
