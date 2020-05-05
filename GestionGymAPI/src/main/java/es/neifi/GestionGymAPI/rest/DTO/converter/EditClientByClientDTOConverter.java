package es.neifi.GestionGymAPI.rest.DTO.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import es.neifi.GestionGymAPI.rest.DTO.CrearClienteDTO;
import es.neifi.GestionGymAPI.rest.DTO.EditarClienteDTO;
import es.neifi.GestionGymAPI.rest.model.Cliente;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EditClientByClientDTOConverter {
	private final ModelMapper modelMapper;
	public Cliente convertToClient(EditarClienteDTO dto) {
		return  modelMapper.map(dto, Cliente.class); 
	}
}	
