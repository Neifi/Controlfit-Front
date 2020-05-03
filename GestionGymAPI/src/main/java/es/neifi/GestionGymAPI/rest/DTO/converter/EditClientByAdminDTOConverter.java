package es.neifi.GestionGymAPI.rest.DTO.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import es.neifi.GestionGymAPI.rest.DTO.CreateClienteDTO;
import es.neifi.GestionGymAPI.rest.DTO.EditClienteByAdminDTO;
import es.neifi.GestionGymAPI.rest.model.Cliente;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EditClientByAdminDTOConverter {
	private final ModelMapper modelMapper;
	public Cliente convertToClient(EditClienteByAdminDTO dto) {
		return  modelMapper.map(dto, Cliente.class); 
	}
}	
