package com.project.localfindr.service;

import com.project.localfindr.model.LoginDto;

public class AuthorizationService {

    /**
     * For login feature
     * @return JWT token
     */
    public String login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        return "JWT Token"; //TODO: change to real token
    }
}
