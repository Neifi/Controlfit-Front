package es.neifi.GestionGymAPI.rest.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import es.neifi.GestionGymAPI.res.exceptions.ApiError;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomBasicAuthEntryPoint extends BasicAuthenticationEntryPoint{
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException {
		super.commence(request, response, authException);
		
		response.addHeader("WWW-Authenticate", "Basic realm=\"" + getRealmName() + "\"");
		response.setContentType("aplication/json");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		
		ApiError apierror =  new ApiError(HttpStatus.UNAUTHORIZED, authException.getMessage());
		String strApiError = mapper.writeValueAsString(apierror);
		
		PrintWriter writer = response.getWriter();
		writer.println(strApiError);
		
		
	}

	private final ObjectMapper mapper;
	
	@PostConstruct
	public void initRealname() {
		setRealmName("gestiongym.net");
	}
}
