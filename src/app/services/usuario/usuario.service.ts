import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable,throwError } from "rxjs";
import { map,catchError } from "rxjs/operators";
interface Usuario {
  username: string;
  avatar: string;
}



@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private GET_USUARIO = "https://controlfit.herokuapp.com/api/cliente/me";
  private PUT_AVATAR = "https://controlfit.herokuapp.com/usuario/avatar"
  private PUT_CLIENTE_PERSONALES = "https://controlfit.herokuapp.com/api/cliente";

  constructor(private httpClient: HttpClient) {}

  public getUsuario(){
    let token = localStorage.getItem("token");
    let header = new HttpHeaders();
    header.set("Authorization", "Bearer " + token);
    return this.httpClient.get(this.GET_USUARIO, {headers:header});
  }

  public putCliente(datos: any) {
    return this.httpClient.put(this.PUT_CLIENTE_PERSONALES, datos,{observe:"response"})
  }

  public uploadAvatar(img:File){
    return this.httpClient.put(this.PUT_AVATAR,img,{observe:"response"})
  }

}
