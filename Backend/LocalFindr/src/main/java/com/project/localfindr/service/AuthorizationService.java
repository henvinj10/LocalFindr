package com.project.localfindr.service;

import com.project.localfindr.model.DTO.LoginDto;
import com.project.localfindr.model.DTO.LoginResponseDTO;
import com.project.localfindr.model.DTO.RegisterDTO;
import com.project.localfindr.model.DTO.RegisterResponseDTO;

public class AuthorizationService {

    /**
     * For login feature
     * @return JWT token
     */
    public String login(LoginDto loginDto) {
        String username = loginDto.getEmail();
        return "JWT Token"; //TODO: change to real token
    }

    public RegisterResponseDTO registerUser(RegisterDTO registerDTO) {
        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO();
        return registerResponseDTO;
    }

    public LoginResponseDTO authenticateUser(String email, String password) {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        return loginResponseDTO;
    }
}
