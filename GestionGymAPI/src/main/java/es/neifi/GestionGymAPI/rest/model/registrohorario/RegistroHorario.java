package es.neifi.GestionGymAPI.rest.model.registrohorario;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import es.neifi.GestionGymAPI.rest.model.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "registrohorario",schema = "public")
public class RegistroHorario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_registrohorario;
	private String horaentrada;
	private String horasalida;
	private int dia;
	private int mes;
	private int anio;


	@ManyToOne(targetEntity = Usuario.class)
	@JoinColumn(name = "id_usuario", updatable = false, insertable = false)
	private Usuario usuario;
}
