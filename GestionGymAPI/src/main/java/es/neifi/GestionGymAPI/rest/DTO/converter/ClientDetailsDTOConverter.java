package es.neifi.GestionGymAPI.rest.DTO.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import es.neifi.GestionGymAPI.rest.DTO.ClientInfoDTO;
import es.neifi.GestionGymAPI.rest.model.Cliente;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor
public class ClientDetailsDTOConverter {
	private final ModelMapper modelMapper;
	public ClientInfoDTO convertToDTO(Cliente cliente) {
		return modelMapper.map(cliente, ClientInfoDTO.class);
	}
	
}
