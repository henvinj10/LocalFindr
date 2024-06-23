package com.project.localfindr.service;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.repository.Implements.AuthorizationRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthorizationService {

    @Autowired
    private AuthorizationRepositoryImpl authorizationRepository;

    public RegisterResponseDTO registerUser(RegisterDTO registerDTO) {
        return authorizationRepository.registerUser(registerDTO);
    }

    public LoginResponseDTO authenticateUser(LoginDTO loginDTO) {
        return authorizationRepository.loginUser(loginDTO);
    }

    public LogoutResponseDTO logOutUser(String token) {
        return authorizationRepository.logoutUser(token);
    }
}
