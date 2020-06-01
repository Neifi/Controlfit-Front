import { Component, OnInit } from "@angular/core";
import { Cliente } from "app/model/Cliente";
import { RegistroHorario } from "app/model/RegistroHorario";
import { FormGroup, FormControl } from "@angular/forms";
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
      console.log(data);

      this.clientes = data;
    });
  }

  public getSelectedUser(id: number) {
    this.clienteService.getCliente(id).subscribe((data: any) => {
      this.cliente = data;
      this.form.get("email").setValue(data["email"]);
      this.form.get("fecha_inscripcion").setValue(data["fecha_inscripcion"]);
      this.form.get("dni").setValue(data["dni"]);
      this.form.get("nombre").setValue(data["nombre"]);
      this.form.get("apellidos").setValue(data["apellidos"]);
      this.form.get("calle").setValue(data["calle"]);
      this.form.get("ciudad").setValue(data["ciudad"]);
      this.form.get("provincia").setValue(data["provincia"]);
      this.form.get("codigo_postal").setValue(data["codigo_postal"]);
      this.form.get("fecha_nacimiento").setValue(data["fecha_nacimiento"]);
      localStorage.setItem("id_cliente", id.toString());
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
