package es.neifi.GestionGymAPI.rest.model.cliente;

import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{

	//Stream<Cliente> findById(Long id);

}
