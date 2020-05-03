package es.neifi.GestionGymAPI.rest.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.JsonMappingException;

import es.neifi.GestionGymAPI.rest.model.Cliente;
import es.neifi.GestionGymAPI.res.exceptions.ApiError;
import es.neifi.GestionGymAPI.res.exceptions.ClienteNotFoundException;
import es.neifi.GestionGymAPI.rest.DTO.ClientInfoDTO;
import es.neifi.GestionGymAPI.rest.DTO.CreateClienteDTO;
import es.neifi.GestionGymAPI.rest.DTO.EditClienteByAdminDTO;
import es.neifi.GestionGymAPI.rest.DTO.converter.ClientDetailsDTOConverter;
import es.neifi.GestionGymAPI.rest.DTO.converter.CreateClienteDTOConverter;
import es.neifi.GestionGymAPI.rest.DTO.converter.EditClientByAdminDTOConverter;
import es.neifi.GestionGymAPI.rest.model.ClienteRepository;
import es.neifi.GestionGymAPI.services.AltaUsuarioService;
import es.neifi.GestionGymAPI.services.ServerTime;
import es.neifi.GestionGymAPI.services.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({ "/api" })
@RequiredArgsConstructor
public class ClienteController {

	private final ClienteRepository clienteRepository;
	private final ClientDetailsDTOConverter clienteDetailsDTOConverter;
	private final CreateClienteDTOConverter createClienteDTOConverter;
	private final EditClientByAdminDTOConverter editClientByAdminDTOConverter;
	
	/**
	 * Obtenemos todos los productos
	 * 
	 * @return
	 */
	@GetMapping("/cliente")
	public ResponseEntity<?> obtenerTodos() {
		
		
		List<Cliente> clientes = clienteRepository.findAll();
		if (clientes.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No hay clientes registrados");
		} else {
			List<ClientInfoDTO> dtoList = clientes.stream().map(clienteDetailsDTOConverter::convertToDTO)
					.collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
		
	}

	@GetMapping("/cliente/{id}")
	public Cliente obtenerUno(@PathVariable int id) {
//		Cliente cliente = clienteRepository.findById(id).orElse(null);
//		if (cliente == null) {
//			return ResponseEntity.notFound().build();
//		} else {
//
//			return ResponseEntity.ok(cliente);
//		}
		try {
			
			return clienteRepository.findById(id).orElseThrow(() -> new ClienteNotFoundException(id));
		} catch (ClienteNotFoundException ex) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,ex.getMessage());
		}
	}

	@PostMapping("/cliente")
	public ResponseEntity<CreateClienteDTO> nuevoProducto(@RequestBody CreateClienteDTO nuevo) {
		Cliente saved = createClienteDTOConverter.convertToClient(nuevo);
		clienteRepository.save(saved);
		return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
	}

	@PutMapping("/cliente/{id}")
	public Cliente editarProducto(@RequestBody EditClienteByAdminDTO editDTO, @PathVariable Integer id) {

		return clienteRepository.findById(id).map(p -> {
			p = editClientByAdminDTOConverter.convertToClient(editDTO);
			return clienteRepository.save(p);
		}).orElseThrow(()->new ClienteNotFoundException(id));

	}

	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> borrarProducto(@PathVariable int id) {
		Cliente borrar = clienteRepository.findById(id)
				.orElseThrow(() -> new ClienteNotFoundException(id));
		clienteRepository.delete(borrar);
		return ResponseEntity.noContent().build();
	}

	
}
