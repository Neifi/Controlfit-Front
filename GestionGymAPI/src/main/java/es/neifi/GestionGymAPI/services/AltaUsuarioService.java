package es.neifi.GestionGymAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;


import es.neifi.GestionGymAPI.rest.model.Cliente;
import es.neifi.GestionGymAPI.rest.model.Usuario;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public abstract class AltaUsuarioService< T, C extends Cliente, ID, R extends JpaRepository<T, ID>> {
	
	@Autowired
	protected C c;
	@Autowired
	protected R repository;
	
	
	protected String generarPassword(C c) {
		String apellido = c.getApellidos();
		String nombre = c.getNombre();
		String password = nombre.substring(0).toUpperCase().concat(apellido.toLowerCase()).concat(".123");
		return password;

	};

	protected String generarUsername(C c) {
		String username = c.getDni()
				.substring(6, 9)
				.toLowerCase();
				
		return username;
	}

	protected Usuario buildUsuario(C c) {
		
		return Usuario.builder()
				.username(generarUsername(c))
				.password(generarPassword(c))
				.build();
	}
	
	protected T darAltaUsuario(T t) {
		return repository.save(t);
	}


}
