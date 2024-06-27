package com.project.localfindr.service;

import com.project.localfindr.model.DTO.Address;
import com.project.localfindr.model.DTO.ProfileDTO;
import com.project.localfindr.model.Entities.ProfileEntity;
import com.project.localfindr.model.Entities.UpdateProfileEntity;
import com.project.localfindr.repository.ProfileUpdateRepository;
import com.project.localfindr.repository.UserRepository;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import com.project.localfindr.utility.JwtUtil;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MapperUtility mapperUtility;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ProfileUpdateRepository profileUpdateRepository;

    public ProfileDTO getUserProfile(HttpServletRequest request) {
        String jwtToken = extractJwtFromRequest(request);
        String email = jwtUtil.getEmailFromToken(jwtToken);
        ProfileEntity profileEntity = userRepository.findByEmail(email);
        if (profileEntity != null) {
            return mapperUtility.toProfileDto(profileEntity);
        }
        throw new ObjectNotFoundException(Optional.ofNullable(email), null);
    }

    public ProfileDTO updateUserProfile(HttpServletRequest request, Address address) {
        String jwtToken = extractJwtFromRequest(request);
        String email = jwtUtil.getEmailFromToken(jwtToken);
        ProfileEntity profileEntity = userRepository.findByEmail(email);
        if (profileEntity != null) {
            UpdateProfileEntity updateProfileEntity = mapperUtility.toUpdateProfileEntity(address);
            updateProfileEntity.setEmail(email);
            profileUpdateRepository.updateProfileByEmail(updateProfileEntity);
            ProfileEntity profileEntityFinal = userRepository.findByEmail(email);
            if (profileEntityFinal != null) {
                return mapperUtility.toProfileDto(profileEntityFinal);
            }
        }
        throw new ObjectNotFoundException(Optional.ofNullable(email), null);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
