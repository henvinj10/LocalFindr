package com.project.localfindr.config;

import com.project.localfindr.utility.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/register", "/auth/login", "/auth/logout").permitAll()
                        .requestMatchers("/customer/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/user/profile").permitAll()
                        .requestMatchers("/user/update").hasAuthority("VENDOR")
                        .requestMatchers("/vendor/**").hasAuthority("VENDOR")
                        .anyRequest().authenticated()
                )
                .exceptionHandling(handling -> handling
                        .accessDeniedPage("/access-denied")
                )
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/auth/register", "/auth/login", "/auth/logout")
                );
        http.addFilterBefore(new CustomAuthorizationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Configure BCryptPasswordEncoder for password hashing
    }
}