import { Injectable } from '@angular/core';
import decode from "jwt-decode";
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRoleAuthGuardService implements CanActivate{

  canActivate(){
    if(decode(localStorage.getItem("token")).roles == ["[USER]"]){
      // this.router.navigate(["perfil"])
      return true;
    }
    return false;
  }
  constructor(public router: Router) { }
}
