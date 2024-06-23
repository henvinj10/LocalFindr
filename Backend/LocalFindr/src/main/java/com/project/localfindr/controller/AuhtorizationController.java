package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.LoginDto;
import com.project.localfindr.model.DTO.LoginResponseDTO;
import com.project.localfindr.model.DTO.RegisterDTO;
import com.project.localfindr.model.DTO.RegisterResponseDTO;
import com.project.localfindr.service.AuthorizationService;
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
    public LoginResponseDTO authenticateUser(@RequestBody LoginDto loginDto) {
        return authorizationService.authenticateUser(loginDto.getEmail(), loginDto.getPassword());
    }
}
