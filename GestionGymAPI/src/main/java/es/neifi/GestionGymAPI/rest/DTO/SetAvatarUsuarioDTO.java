package es.neifi.GestionGymAPI.rest.DTO;

import org.springframework.context.annotation.Bean;

import es.neifi.GestionGymAPI.rest.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SetAvatarUsuarioDTO {
	private String url;
	

}
