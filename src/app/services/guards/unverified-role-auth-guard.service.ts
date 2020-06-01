import { Injectable } from '@angular/core';
import decode from "jwt-decode";
import { Router, CanActivate } from '@angular/router';
import { UnverifiedComponent } from 'app/components/unverified/unverified.component';

@Injectable({
  providedIn: 'root'
})
export class UnverifiedRoleAuthGuardService implements CanActivate{

  canActivate(){
    if(decode(localStorage.getItem("token")).roles == ["[UNVERIFIED]"]){
      this.router.navigate([UnverifiedComponent])
      return true;
    }
    return false;
  }
  constructor(public router: Router) { }
}
