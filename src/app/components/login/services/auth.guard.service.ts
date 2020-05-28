import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { LoginServiceService } from "./login-service.service";
import { Injectable } from "@angular/core";
import decode from "jwt-decode";
import { UsuarioService } from "app/service/usuario/usuario.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private usuarioService:UsuarioService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    const token = sessionStorage.getItem("token");
    //Decodificar token
    const tokenPayload = decode(token);
    if (!this.loginService.isLoged()) {
      tokenPayload.role != expectedRole;
      this.router.navigate(["/login"]);
      return false;
    }else{

      return true;
    }
  }

}
