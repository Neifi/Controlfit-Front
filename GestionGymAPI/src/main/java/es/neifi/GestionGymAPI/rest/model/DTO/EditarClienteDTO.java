package es.neifi.GestionGymAPI.rest.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditarClienteDTO {
	private int id_gimnasio;
	private String dni;
	private String nombre;
	private String apellidos;
	private String fecha_nacimiento;
	private String email;
	private String calle;
	private int codigo_postal;
	private String ciudad;
	private String provincia;


	
}
