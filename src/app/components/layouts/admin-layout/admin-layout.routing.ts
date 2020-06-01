import { Routes } from "@angular/router";
import { DashboardComponent } from "app/components/dashboard/dashboard.component";
import { LogedAuthGuard } from "app/components/login/services/loged.auth.guard.service";
import { AdminRoleAuthGuardService } from "app/services/guards/admin-role-auth-guard.service";
import { UserProfileComponent } from "app/components/user-profile/user-profile.component";
import { TableListComponent } from "app/components/table-list/table-list.component";
import { RutinasComponent } from "app/components/rutinas/rutinas.component";
import { UserRoleAuthGuardService } from "app/services/guards/user-role-auth-guard.service";
import { LogoutComponent } from "app/components/logout/logout.component";


export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LogedAuthGuard,AdminRoleAuthGuardService],
  },
  {
    path: "perfil",
    component: UserProfileComponent,
    canActivate: [
      LogedAuthGuard
      
      
    ],
  },
  {
    path: "clientes",
    component: TableListComponent,
    canActivate: [LogedAuthGuard, AdminRoleAuthGuardService],
  },
  {
    path: "rutinas",
    component: RutinasComponent,
    canActivate: [LogedAuthGuard, UserRoleAuthGuardService],
  },
  { path: "logout", component: LogoutComponent, canActivate: [LogedAuthGuard] },
];
