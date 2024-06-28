package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.Address;
import com.project.localfindr.model.DTO.ProfileDTO;
import com.project.localfindr.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/user")
public class UsersController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ProfileDTO getProfile(HttpServletRequest request) {
        return userService.getUserProfile(request);
    }

    @PutMapping("/update")
    public ProfileDTO updateProfile(@RequestBody Address address, HttpServletRequest request) {
        return userService.updateUserProfile(request, address);
    }
}