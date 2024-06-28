package com.project.localfindr.service;

import com.project.localfindr.model.DTO.Address;
import com.project.localfindr.model.DTO.ProfileDTO;
import com.project.localfindr.model.Entities.ProfileEntity;
import com.project.localfindr.model.Entities.UpdateProfileEntity;
import com.project.localfindr.repository.ProfileUpdateRepository;
import com.project.localfindr.repository.UserRepository;
import com.project.localfindr.utility.MapperUtility;
import com.project.localfindr.utility.JwtUtil;
import org.hibernate.ObjectNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import jakarta.servlet.http.HttpServletRequest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MapperUtility mapperUtility;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private ProfileUpdateRepository profileUpdateRepository;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private UserService userService;

    private String jwtToken;
    private String email;
    private ProfileEntity profileEntity;

    @BeforeEach
    void setUp() {
        jwtToken = "dummyToken";
        email = "test@example.com";

        profileEntity = new ProfileEntity();
        profileEntity.setEmail(email);
    }

    @Test
    void testGetUserProfile() {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(profileEntity);
        when(mapperUtility.toProfileDto(profileEntity)).thenReturn(new ProfileDTO());

        ProfileDTO result = userService.getUserProfile(request);

        assertNotNull(result);
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(userRepository).findByEmail(email);
        verify(mapperUtility).toProfileDto(profileEntity);
    }

    @Test
    void testGetUserProfile_UserNotFound() {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(null);

        assertThrows(ObjectNotFoundException.class, () -> userService.getUserProfile(request));

        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(userRepository).findByEmail(email);
        verifyNoMoreInteractions(mapperUtility);
    }

    @Test
    void testUpdateUserProfile() {
        Address address = new Address();
        address.setCity("Test City");

        UpdateProfileEntity updateProfileEntity = new UpdateProfileEntity();
        updateProfileEntity.setEmail(email);
        // Assuming mapperUtility.toUpdateProfileEntity() returns updateProfileEntity

        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(profileEntity);
        when(mapperUtility.toUpdateProfileEntity(address)).thenReturn(updateProfileEntity);
        when(userRepository.findByEmail(email)).thenReturn(profileEntity);
        when(mapperUtility.toProfileDto(profileEntity)).thenReturn(new ProfileDTO());

        ProfileDTO result = userService.updateUserProfile(request, address);

        assertNotNull(result);
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(userRepository).findByEmail(email);
        verify(mapperUtility).toUpdateProfileEntity(address);
        verify(profileUpdateRepository).updateProfileByEmail(updateProfileEntity);
        verify(userRepository, times(2)).findByEmail(email); // Called before and after update
        verify(mapperUtility).toProfileDto(profileEntity);
    }

    @Test
    void testUpdateUserProfile_UserNotFound() {
        Address address = new Address();
        address.setCity("Test City");

        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(null);

        assertThrows(ObjectNotFoundException.class, () -> userService.updateUserProfile(request, address));

        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(userRepository).findByEmail(email);
        verifyNoMoreInteractions(mapperUtility, profileUpdateRepository);
    }
}
