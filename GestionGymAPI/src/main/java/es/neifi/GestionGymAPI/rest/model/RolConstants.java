package es.neifi.GestionGymAPI.rest.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor

public class RolConstants {
	public final Rol ADMIN = Rol.ADMIN;
	public final Rol USER = Rol.UNVERIFIED;
	public final Rol UNVERIFIED = Rol.UNVERIFIED;
}
