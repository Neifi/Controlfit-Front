package es.neifi.GestionGymAPI.rest.DTO.converter;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


import es.neifi.GestionGymAPI.rest.DTO.GetUserDTO;
import es.neifi.GestionGymAPI.rest.model.RegistroHorario;
import es.neifi.GestionGymAPI.rest.model.Usuario;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UsuarioDTOConverter {


	public GetUserDTO convertUserToGetUserDTO(Usuario usuario) {
		return GetUserDTO.builder()
				.username(usuario.getUsername())
				.avatar(usuario.getAvatar())
				//.cliente(usuario.getCliente())
				.registroHorario(usuario.getRegistrohorario())
				.build();
			
				
	}
}
