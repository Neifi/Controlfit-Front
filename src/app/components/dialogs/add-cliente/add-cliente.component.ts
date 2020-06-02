import { Component, OnInit } from "@angular/core";
import { Cliente } from "app/model/Cliente";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { matFormFieldAnimations } from "@angular/material/form-field";

import { MatSnackBar } from "@angular/material/snack-bar";
import { ClienteService } from "app/services/cliente/cliente.service";

@Component({
  selector: "app-add-cliente",
  templateUrl: "./add-cliente.component.html",
  styleUrls: ["./add-cliente.component.css"],
})
export class AddClienteComponent implements OnInit {
  public rolValue: any;
  public cliente = new Cliente();
  private dateRegex: string =
    "^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)d{4}$";

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
    fecha_nacimiento: new FormControl("", [Validators.required]),
  });

  constructor(
    public clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) {}

  
  saveCliente() {
    if (this.form.valid) {
      this.cliente = this.form.value;
      this.clienteService.postCliente(this.cliente).subscribe((res) => {
        if (res.status != 500) {
          this.form.reset();
          this.saved();
        }else if(res.status == 500){
          this.error();
        }
        
      });
    } else {
      this.invalid();
    }
  }

  setUserRol() {
    this.clienteService.postCliente(this.cliente).subscribe();
  }
  public saved() {
    this.snackBar.open("Cliente guardado correctamente", "Cerrar", {
      duration: 3000,
    });
  }

  public error() {
    this.snackBar.open("No se ha podido guardar al cliente", "Cerrar", {
      duration: 3000,
    });
  }

  public invalid() {
    this.snackBar.open("Compruebe todos los campos", "Cerrar", {
      duration: 3000,
    });
  }

  ngOnInit(): void {}
}
