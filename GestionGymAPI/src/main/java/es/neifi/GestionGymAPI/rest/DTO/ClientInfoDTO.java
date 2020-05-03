package es.neifi.GestionGymAPI.rest.DTO;

import java.util.List;

import javax.persistence.Basic;

import es.neifi.GestionGymAPI.rest.model.RegistroHorario;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClientInfoDTO {
	
	private int id;
	private String dni;
	private String nombre;
	private String apellidos;
	private String fecha_nacimiento;
	private String email;
	private String calle;
	private String codigo_postal;
	private String ciudad;
	private String provincia;
	private String telefono;
	private String telefono_emergencia;
	private String iban;
	private String fecha_inscripcion;
	
	//private List<RegistroHorario> registrohorario;

	
}
