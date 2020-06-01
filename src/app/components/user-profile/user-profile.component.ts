import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Cliente } from "app/model/Cliente";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  public cliente = new Cliente();
  imgData: File = null;

  public form = new FormGroup({
    email: new FormControl(),
    fecha_inscripcion: new FormControl(""),
    dni: new FormControl(""),
    nombre: new FormControl(""),
    apellidos: new FormControl(""),
    calle: new FormControl(""),
    ciudad: new FormControl(""),
    provincia: new FormControl(""),
    codigo_postal: new FormControl(""),
    fecha_nacimiento: new FormControl(""),
  });

  constructor(private snackBar:MatSnackBar,private usuarioService: UsuarioService) {
    this.usuarioService.getUsuario().subscribe((data: any) => {
      this.cliente = data;
      
      this.form.get("email").setValue(data["email"]);
      this.form.get("fecha_inscripcion").setValue(data["fecha_inscripcion"]);
      this.form.get("dni").setValue(data["dni"]);
      this.form.get("nombre").setValue(data["nombre"]);
      this.form.get("apellidos").setValue(data["apellidos"]);
      this.form.get("calle").setValue(data["calle"]);      
      this.form.get("ciudad").setValue(data["ciudad"]);
      this.form.get("provincia").setValue(data["provincia"]);
      this.form.get("codigo_postal").setValue(parseInt( data["codigo_postal"]));
      this.form.get("fecha_nacimiento").setValue(data["fecha_nacimiento"]);
    });
  }

  public updateUser() {
    this.usuarioService.putCliente(this.form.value).subscribe((data) => {
      this.cliente = this.form.value;
      if(data.body == 201 || data.body == 200){
        this.snackBar.open('Actualizado con exito');
      }else{
        this.snackBar.open('Fallo en actualizar los datos del cliente');

      }
    });
  }

  fileProgress(fileInput: any) {
    this.imgData = <File>fileInput.target.files[0];
    
  }

  public uploadAvatar(){
    this.usuarioService.uploadAvatar(this.imgData)
    .subscribe((res:any) =>{
      if(res == 201 || res == 200){
        this.snackBar.open('Imagen subida');
      }else{
        this.snackBar.open('Error en subir la imagen');
      }
    })
  }

 

  ngOnInit() {}
}
