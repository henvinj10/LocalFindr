package com.project.localfindr.service;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.RegisterEntity;
import com.project.localfindr.repository.RegisterRepository;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MapperUtility mapperUtility;

    public RegisterResponseDTO registerUser(RegisterDTO registerDTO) {
        RegisterEntity registerEntity = mapperUtility.toRegisterEntity(registerDTO);
        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO();
        RegisterEntity registerEntityCheck = registerRepository.findByEmail(registerEntity.getEmail());
        if( registerEntityCheck == null){
            RegisterEntity registerEntityOut = registerRepository.save(registerEntity);
            if(registerEntityOut == registerEntity) {
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
        RegisterEntity registerEntity = registerRepository.findByEmail(loginDTO.getEmail());
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        if(registerEntity == null){
            loginResponseDTO.setMessage("User not found");
            return  loginResponseDTO;
        } else if(verifyPassword(loginDTO.getPassword(),registerEntity.getUser_password())) {
            loginResponseDTO.setMessage("User logged in Successfully");
            loginResponseDTO.setToken(JwtUtil.generateToken(registerEntity.getEmail(), registerEntity.getUser_type().name()));
            return  loginResponseDTO;
        }
        loginResponseDTO.setMessage("Password doesn't match");
        return  loginResponseDTO;
    }

    public LogoutResponseDTO logOutUser(String token) {
        LogoutResponseDTO logoutResponseDTO = new LogoutResponseDTO();
        logoutResponseDTO.setMessage("Logout successful");
        return logoutResponseDTO;
    }

    private boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
