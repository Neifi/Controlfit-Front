import { Component, OnInit } from "@angular/core";
import { Cliente } from "app/model/Cliente";
import { RegistroHorario } from "app/model/RegistroHorario";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogresponseService } from "../dialogs/services/dialogresponse.service";
import { ClienteService } from "app/services/cliente/cliente.service";
import { RegistrohorarioService } from "app/services/registrohorario/registrohorario.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  public clientes = [Cliente];
  public cliente = new Cliente();
  public registrosHorario = [RegistroHorario];
  public fechana = "";
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
    rol:new FormControl("",[Validators.required]),
    
  });
  constructor(
    private snackBar: MatSnackBar,
    private dialogResponseService: DialogresponseService,
    private clienteService: ClienteService,
    private registroHorarioService: RegistrohorarioService,
    public dialog: MatDialog
  ) {
    this.getClientes();
  }

  public getClientes() {
    this.clienteService.getClientes().subscribe((data: [any]) => {

      this.clientes = data;
    });
  }

  public getSelectedUser(id: number) {
    this.clienteService.getCliente(id).subscribe((data: any) => {
      this.cliente = data;
      this.form.get("email").setValue(data["email"]);
      this.form.get("dni").setValue(data["dni"]);
      this.form.get("nombre").setValue(data["nombre"]);
      this.form.get("apellidos").setValue(data["apellidos"]);
      this.form.get("calle").setValue(data["calle"]);
      this.form.get("ciudad").setValue(data["ciudad"]);
      this.form.get("provincia").setValue(data["provincia"]);
      this.form.get("codigo_postal").setValue(data["codigo_postal"]);
      localStorage.setItem("id_cliente", id.toString());
      this.fechana = data["fecha_nacimiento"];
      this.getRegistrosHorarios(id);
    });
  }

  public selected(i) {
    localStorage.setItem("id_cliente", i);
  }
  public updateCliente() {
    let id = localStorage.getItem("id_cliente");
    this.clienteService
      .putCliente(this.form.value, parseInt(id))
      .subscribe((data) => {
        this.cliente = this.form.value;

        this.getClientes();
      });
  }

  public getRegistrosHorarios(id) {
    this.registroHorarioService
      .getRegistroPorIdUsuario(parseInt(id))
      .subscribe((data: [any]) => {
        this.registrosHorario = data;
      });
  }
  public deleteCliente(id) {
    if (confirm("Seguro que desea borrar al cliente ")) {
      this.clienteService.deleteCliente(id).subscribe((data: any) => {
        if (data.response == 200) {
          this.snackBar.open("El cliente se ha borrado correctamente");
        }
      });
    }
  }

  ngOnInit() {}
}
