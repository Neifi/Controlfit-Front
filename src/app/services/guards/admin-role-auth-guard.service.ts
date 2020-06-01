import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminRoleAuthGuardService implements CanActivate{

  canActivate(){
    if(decode(localStorage.getItem("token")).roles != "[ADMIN]"){
      this.router.navigate(["perfil"]);
      return false;
    }
    return true;
  }
  constructor(public router: Router) { }
}
