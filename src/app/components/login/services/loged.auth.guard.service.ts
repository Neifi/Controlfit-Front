import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginServiceService } from "./login-service.service";
import { UsuarioService } from "app/services/usuario/usuario.service";

@Injectable({
  providedIn: "root",
})
export class LogedAuthGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private usuarioService: UsuarioService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.loginService.isLoged()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
