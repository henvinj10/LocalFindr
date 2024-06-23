package com.project.localfindr.service;

import com.project.localfindr.model.DTO.LoginDto;
import com.project.localfindr.model.DTO.LoginResponseDTO;
import com.project.localfindr.model.DTO.RegisterDTO;
import com.project.localfindr.model.DTO.RegisterResponseDTO;

public class AuthorizationService {

    public RegisterResponseDTO registerUser(RegisterDTO registerDTO) {
        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO();
        return registerResponseDTO;
    }

    public LoginResponseDTO authenticateUser(String email, String password) {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        return loginResponseDTO;
    }
}
