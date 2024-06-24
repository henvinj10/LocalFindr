package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.service.AuthorizationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuhtorizationController {

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("/register")
    public RegisterResponseDTO registerUser(@RequestBody RegisterDTO registerDTO) {
        return authorizationService.registerUser(registerDTO);
    }

    @PostMapping("/login")
    public LoginResponseDTO authenticateUser(@RequestBody LoginDTO loginDto, HttpServletResponse response) {
        LoginResponseDTO loginResponseDTO = authorizationService.authenticateUser(loginDto);
        String jwtToken = loginResponseDTO.getToken();
        response.setHeader("Authorization", "Bearer " + jwtToken);
        return loginResponseDTO;
    }

    @PostMapping("/logout")
    public LogoutResponseDTO authenticateUser(@RequestBody String token) {
        return authorizationService.logOutUser(token);
    }
}
