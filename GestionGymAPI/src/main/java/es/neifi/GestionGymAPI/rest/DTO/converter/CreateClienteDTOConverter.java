package es.neifi.GestionGymAPI.rest.DTO.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import es.neifi.GestionGymAPI.rest.DTO.CreateClienteDTO;
import es.neifi.GestionGymAPI.rest.model.Cliente;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CreateClienteDTOConverter {
	private final ModelMapper modelMapper;
	public Cliente convertToClient(CreateClienteDTO dto) {
		return  modelMapper.map(dto, Cliente.class);
		 
	}
	
	public CreateClienteDTO convertToDTO(Cliente cliente) {
		return modelMapper.map(cliente, CreateClienteDTO.class);
	}
}
