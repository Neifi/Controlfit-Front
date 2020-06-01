import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistroHorario } from 'app/model/RegistroHorario';

@Injectable({
  providedIn: 'root'
})
export class RegistrohorarioService {

  private registroHorario = new RegistroHorario();
  private registrosHOrarios = [RegistroHorario];

  constructor(private httpClient:HttpClient ) { }
  private URL = "https://controlfit.herokuapp.com/api/horario/";

  public getRegistros(){
    let token = localStorage.getItem("token");
    let header = new HttpHeaders();
    header.set("Authorization", "Bearer " + token);
    return this.httpClient.get<RegistroHorario[]>(this.URL,{headers:header});
  }
  public getRegistroPorIdUsuario(id:number){
    let token = localStorage.getItem("token");
    let header = new HttpHeaders();
    header.set("Authorization", "Bearer " + token);
    return this.httpClient.get<RegistroHorario[]>(this.URL+id,{headers:header});
  }

  
  

  
}
