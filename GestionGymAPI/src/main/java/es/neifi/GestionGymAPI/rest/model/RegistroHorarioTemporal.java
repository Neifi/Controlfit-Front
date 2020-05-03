package es.neifi.GestionGymAPI.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "registrohorariotemporal")
public class RegistroHorarioTemporal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_registrohorario_temporal;
	private int horaEntrada;
}
