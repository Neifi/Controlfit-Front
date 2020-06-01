import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { AdminLayoutComponent } from "./components/layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { LogedAuthGuard } from "./components/login/services/loged.auth.guard.service";
import { AddClienteComponent } from "./components/dialogs/add-cliente/add-cliente.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { RutinasComponent } from "./components/rutinas/rutinas.component";
import { UnverifiedComponent } from "./components/unverified/unverified.component";
import { AdminRoleAuthGuardService } from "./services/guards/admin-role-auth-guard.service";
import { UserRoleAuthGuardService } from "./services/guards/user-role-auth-guard.service";
import { UnverifiedRoleAuthGuardService } from "./services/guards/unverified-role-auth-guard.service";

const routes: Routes = [

  {
    path: "noverificado",
    component: UnverifiedComponent,
    pathMatch: "full",
    canActivate:[UnverifiedRoleAuthGuardService]
    

  },
  {
    path: "rutinas",
    component: RutinasComponent,
    pathMatch: "full",
    canActivate:[LogedAuthGuard,UserRoleAuthGuardService]

  },
  {
    path: "add",
    component: AddClienteComponent,
    pathMatch: "full",
    canActivate:[LogedAuthGuard,AdminRoleAuthGuardService]
    
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    
  },
  {
    path: "",
    component: AdminLayoutComponent,
    
    children: [
      {
        path: "",
        loadChildren:
        "./components/layouts/admin-layout/admin-layout.module#AdminLayoutModule",
        
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
