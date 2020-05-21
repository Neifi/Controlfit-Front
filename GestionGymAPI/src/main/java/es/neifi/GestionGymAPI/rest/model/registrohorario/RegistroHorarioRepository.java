package es.neifi.GestionGymAPI.rest.model.registrohorario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface RegistroHorarioRepository extends JpaRepository<RegistroHorario, Integer>{
	
	@Transactional
	@Modifying
	@Query(value="insert into registrohorario (horaentrada,id_cliente,dia,mes,anio) values (?,?,?,?,?) RETURNING id_registrohorario", nativeQuery = true)
	public int insertEntry(String horaEntrada, int id,int dia,int mes, int anio);
	
	@Transactional
	@Modifying
	@Query(value="insert into registrohorario (horasalida,id_cliente,horas,dia,mes,anio) values (?,?,?,?,?,?) CONFLICT id_cliente UPDATE"
			+ "SET ", nativeQuery = true)
	public int insertExit(String horaSalida,int id,String horas, int dia, int mes, int anio);
	
}
