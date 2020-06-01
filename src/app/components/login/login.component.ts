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
 
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  username = "";
  password = "";
  role: any;
  invalidLogin = false;

  onTextChange() {
    this.isUsed = true;
  }

  login() {
    
    this.loginService.authenticate(this.username, this.password).subscribe(
      (data) => {
        this.invalidLogin = false;
        localStorage.setItem("token",data.body.token);
        this.router.navigate(["dashboard"]);
        
        
      },
      (error) => {
        this.error();
        this.invalidLogin = true;
      }
    );
  }


  public enter(event){
    if(event.keyCode === 13){
      this.login();
    }
  }
  public error() {
    this.snackbar.open("Compruebe los datos e intentelo de nuevo","",{duration: 3000});
  }
  ngOnInit(): void {}
}
