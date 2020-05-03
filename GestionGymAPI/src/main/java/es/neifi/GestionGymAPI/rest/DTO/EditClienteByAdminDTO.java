package es.neifi.GestionGymAPI.rest.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditClienteByAdminDTO {
	private int id;
	private int id_gimnasio;
	private String dni;
	private String nombre;
	private String apellidos;
	private String fecha_nacimiento;
	private String admin;
}
