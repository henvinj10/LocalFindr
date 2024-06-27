package com.project.localfindr.service;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.RegisterEntity;
import com.project.localfindr.repository.AuthorizationRepository;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthorizationService {

    @Autowired
    private AuthorizationRepository authorizationRepository;

    @Autowired
    private MapperUtility mapperUtility;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;


    public RegisterResponseDTO registerUser(RegisterDTO registerDTO) {
        RegisterEntity registerEntity = mapperUtility.toRegisterEntity(registerDTO);
        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO();
        RegisterEntity registerEntityCheck = authorizationRepository.findByEmail(registerEntity.getEmail());
        if( registerEntityCheck == null){
            String encodedPassword = encodePassword(registerDTO.getPassword());
            registerEntity.setUserPassword(encodedPassword);
            RegisterEntity registerEntityOut = authorizationRepository.save(registerEntity);
            if(Objects.equals(registerEntityOut.getEmail(), registerEntity.getEmail())) {
                registerResponseDTO.setMessage("User Registered Successfully");
                return registerResponseDTO;
            }
            registerResponseDTO.setMessage("User Registeration was Unsuccessfully");
            return registerResponseDTO;
        }
        registerResponseDTO.setMessage("Email already exist");
        return registerResponseDTO;
    }

    public LoginResponseDTO authenticateUser(LoginDTO loginDTO) {
        RegisterEntity registerEntity = authorizationRepository.findByEmail(loginDTO.getEmail());
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        if(registerEntity == null){
            loginResponseDTO.setMessage("User not found");
            return  loginResponseDTO;
        } else if(verifyPassword(loginDTO.getPassword(),registerEntity.getUserPassword())) {
            loginResponseDTO.setMessage("User logged in Successfully");
            loginResponseDTO.setToken(jwtUtil.generateToken(registerEntity.getEmail(), registerEntity.getUserType().name()));
            return  loginResponseDTO;
        }
        loginResponseDTO.setMessage("Password doesn't match");
        return  loginResponseDTO;
    }

    public LogoutResponseDTO logOutUser() {
        LogoutResponseDTO logoutResponseDTO = new LogoutResponseDTO();
        logoutResponseDTO.setMessage("Logout successful");
        return logoutResponseDTO;
    }

    private String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    private boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
