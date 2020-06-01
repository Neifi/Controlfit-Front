import { Injectable } from "@angular/core";
import { LoginServiceService } from "app/components/login/services/login-service.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  
  constructor(public router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    if (localStorage.getItem("token") != null) {
      req = req.clone({
        setHeaders: {
          Authorization:"Bearer " +localStorage.getItem("token"),
          'Content-Type': 'application/json'
        },
      });
    }
    return next.handle(req).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }

  private handleAuthError() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }
}
