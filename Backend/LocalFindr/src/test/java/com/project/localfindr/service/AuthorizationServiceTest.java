package com.project.localfindr.service;


import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.RegisterEntity;
import com.project.localfindr.repository.AuthorizationRepository;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthorizationServiceTest {

    @Mock
    private AuthorizationRepository authorizationRepository;

    @Mock
    private MapperUtility mapperUtility;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthorizationService authorizationService;

    private RegisterDTO registerDTO;
    private RegisterEntity registerEntity;

    @BeforeEach
    void setUp() {
        registerDTO = new RegisterDTO();
        registerDTO.setEmail("test@example.com");
        registerDTO.setPassword("password");

        registerEntity = new RegisterEntity();
        registerEntity.setEmail("test@example.com");
        registerEntity.setUserPassword("encodedPassword");
    }

    @Test
    void testRegisterUser_Success() {
        when(mapperUtility.toRegisterEntity(any(RegisterDTO.class))).thenReturn(registerEntity);
        when(authorizationRepository.findByEmail(anyString())).thenReturn(null);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(authorizationRepository.save(any(RegisterEntity.class))).thenReturn(registerEntity);

        ResponseEntity<RegisterResponseDTO> response = authorizationService.registerUser(registerDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User Registered Successfully", response.getBody().getMessage());
    }

    @Test
    void testRegisterUser_EmailAlreadyExists() {
        when(mapperUtility.toRegisterEntity(any(RegisterDTO.class))).thenReturn(registerEntity);
        when(authorizationRepository.findByEmail(anyString())).thenReturn(registerEntity);

        ResponseEntity<RegisterResponseDTO> response = authorizationService.registerUser(registerDTO);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Email already exist", response.getBody().getMessage());
    }

    @Test
    void testRegisterUser_RegistrationFailed() {
        when(mapperUtility.toRegisterEntity(any(RegisterDTO.class))).thenReturn(registerEntity);
        when(authorizationRepository.findByEmail(anyString())).thenReturn(null);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(authorizationRepository.save(any(RegisterEntity.class))).thenReturn(null);

        ResponseEntity<RegisterResponseDTO> response = authorizationService.registerUser(registerDTO);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User Couldn't register", response.getBody().getMessage());
    }

    @Test
    void testAuthenticateUser_Success() {
        when(authorizationRepository.findByEmail(anyString())).thenReturn(registerEntity);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwtToken");
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");
        LoginResponseDTO response = authorizationService.authenticateUser(loginDTO);

        assertEquals("User logged in Successfully", response.getMessage());
        assertNotNull(response.getToken());
    }

    @Test
    void testAuthenticateUser_UserNotFound() {
        when(authorizationRepository.findByEmail(anyString())).thenReturn(null);
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");
        LoginResponseDTO response = authorizationService.authenticateUser(loginDTO);
        assertEquals("User not found", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    void testAuthenticateUser_PasswordMismatch() {
        when(authorizationRepository.findByEmail(anyString())).thenReturn(registerEntity);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");
        LoginResponseDTO response = authorizationService.authenticateUser(loginDTO);

        assertEquals("Password doesn't match", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    void testLogOutUser() {
        LogoutResponseDTO response = authorizationService.logOutUser();

        assertEquals("Logout successful", response.getMessage());
    }
}
