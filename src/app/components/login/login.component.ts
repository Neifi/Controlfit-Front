import { Component, OnInit, NgModule } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginServiceService } from "./services/login-service.service";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [LoginServiceService],
  
})
export class LoginComponent implements OnInit {
  isUsed: boolean;
  inputPassword = new FormControl("inputUsername");
  inputUsername = new FormControl("inputUsername");
  isLoaded:boolean
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {
    this.isUsed = true;
  }

  username = "admin";
  password = "admin";
    
  role: any;
  invalidLogin = false;

  

  login() {
    
    this.isLoaded = true;

    this.loginService.authenticate(this.username, this.password).subscribe(
      (data) => {
        this.invalidLogin = false;
        localStorage.setItem("token",data.body.token);
        this.isLoaded = true;
        this.router.navigate(["dashboard"]);
     
        if(data.status == 404){
          this.invalidCredError();
          
        }
        if(data.status == 500){
          this.serverError();
        }
        this.isLoaded = false;
      },
      (error) => {
        this.error();
        this.invalidLogin = true;
        this.isLoaded = false;
      }
    );
  }


  public enter(event){
    if(event.keyCode === 13){
      this.login();
    }
  }
  public invalidCredError() {
    this.snackbar.open("Credenciales erroneas","",{duration: 3000});
  }
  public error() {
    this.snackbar.open("Compruebe los datos e intentelo de nuevo","",{duration: 3000});
  }
  public serverError() {
    this.snackbar.open("Se ha producido un error intentelo de nuevo en unos minutos","",{duration: 3000});
  }
  
  ngOnInit(): void {}
}
