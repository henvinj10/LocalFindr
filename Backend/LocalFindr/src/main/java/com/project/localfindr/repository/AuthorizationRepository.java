package com.project.localfindr.repository;

import com.project.localfindr.model.DTO.*;

public interface AuthorizationRepository {
    RegisterResponseDTO registerUser(RegisterDTO registerDTO);

    LoginResponseDTO loginUser(LoginDTO loginDTO);

    LogoutResponseDTO logoutUser(String token);
}
