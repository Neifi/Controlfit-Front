package es.neifi.GestionGymAPI.rest.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import es.neifi.GestionGymAPI.services.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	private final CustomBasicAuthEntryPoint customBasicAuthEntryPoint;
	private final CustomUserDetailsService userDetailsService;
	private final PasswordEncoder passwordEncoder;
	

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic()
		.authenticationEntryPoint(customBasicAuthEntryPoint)
		.and()
		.authorizeRequests()
			.antMatchers(HttpMethod.GET, "/cliente/**", "/registro/**", "/horario/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.POST, "/cliente/**", "/registro/**", "/horario/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.PUT, "/cliente/**", "/registro/**", "/horario/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.DELETE, "/cliente/**", "/registro/**", "/horario/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.POST, "user/upload").hasAnyRole("ADMIN","USER")
			.antMatchers(HttpMethod.GET, "/user/**").hasAnyRole("ADMIN","USER")
			.anyRequest().authenticated()
		.and()
		.csrf().disable();
		
				
			

	}

}
