import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { UnverifiedComponent } from './unverified/unverified.component';
import { RutinasComponent } from "./rutinas/rutinas.component";
import { LoadingComponent } from './loading/loading.component';
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [ RutinasComponent,SidebarComponent, LoginComponent, UnverifiedComponent, LoadingComponent],
exports: [RutinasComponent, SidebarComponent,MatDialogModule,MatButtonModule,MatButtonToggleModule],
schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],

})
export class ComponentsModule {}
