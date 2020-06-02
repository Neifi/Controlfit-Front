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
  private ptDatePattern =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  public cliente = new Cliente();
  public fechana ="";
  imgData: File = null;
  
  public form = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    dni: new FormControl("", [
      Validators.pattern("[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]"),
      Validators.required,
    ]),
    nombre: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    apellidos: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    calle: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    ciudad: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    provincia: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    codigo_postal: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9][0-9][0-9][0-9][0-9]"),
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    fecha_nacimiento: new FormControl("", [Validators.required,Validators.pattern(this.ptDatePattern)]),
  });

  constructor(private snackBar:MatSnackBar,private usuarioService: UsuarioService) {
    this.usuarioService.getUsuario().subscribe((data: any) => {
      this.cliente = data;
      
      this.form.get("email").setValue(data["email"]);
      this.form.get("dni").setValue(data["dni"]);
      this.form.get("nombre").setValue(data["nombre"]);
      this.form.get("apellidos").setValue(data["apellidos"]);
      this.form.get("calle").setValue(data["calle"]);      
      this.form.get("ciudad").setValue(data["ciudad"]);
      this.form.get("provincia").setValue(data["provincia"]);
      this.form.get("codigo_postal").setValue(parseInt( data["codigo_postal"]));
      this.fechana = data["fecha_nacimiento"];
    });
  }

  public updateUser() {
    this.usuarioService.putCliente(this.form.value).subscribe((data) => {
      this.cliente = this.form.value;
      if(data.status == 201 || data.status == 200){
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
