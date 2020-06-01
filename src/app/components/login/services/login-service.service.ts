import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LogedAuthGuard } from "./loged.auth.guard.service";
import { Router } from "@angular/router";
import decode from 'jwt-decode';

@Injectable({
  providedIn: "root",
})
export class LoginServiceService {
  private url = "https://controlfit.herokuapp.com/auth/login";

  constructor(public http: HttpClient,private router:Router) {}

  public authenticate(username: string, password: string) {
    return this.http
      .post<any>(this.url, { username, password},{observe:'response'})
      .pipe(
        map((data) => {
          let token = data.body.token;
          localStorage.setItem("token", token);
          this.router.navigate(["dashboard"]);
          return data;
        })
        
      );
      
  }

  public isLoged():boolean {
    let token = localStorage.getItem("token");
    if(token == null){
      
      return false;
    }
    
    return true;
  }

  public logOut() {
    localStorage.removeItem("token");
  }
}
