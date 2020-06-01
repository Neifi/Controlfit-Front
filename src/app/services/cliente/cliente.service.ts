import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Cliente } from 'app/model/Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private  URL = "https://controlfit.herokuapp.com/api/cliente/";
  constructor(private httpClient:HttpClient) {

   }


  public getClientes(){
  
    
    return this.httpClient.get<Cliente[]>(this.URL);
  }

  public getCliente(id:number){
 
    
    return this.httpClient.get<Cliente[]>(this.URL+id);
  }

  getClienteByUsername(username: any) {
    return this.httpClient.get(this.URL+username);
  }

  public putCliente(datos: any,id:number) {
    let token = localStorage.getItem("token");

    
    return this.httpClient.put(this.URL+id, datos,{observe:'response'})
    
  }

  public postCliente(cliente:Cliente){

    return this.httpClient.post(this.URL,cliente,{observe:'response'});
  }

  public deleteCliente(id:any){
   
    return this.httpClient.delete(this.URL+id,{observe:'response'});
  }
}
