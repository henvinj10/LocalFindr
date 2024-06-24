package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.AddressDTO;
import com.project.localfindr.model.DTO.ProfileDTO;
import com.project.localfindr.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ProfileDTO getProfile(HttpServletRequest request) {
        return userService.getUserProfile(request);
    }

    @PutMapping("/update")
    public ProfileDTO updateProfile(@RequestBody AddressDTO addressDTO, HttpServletRequest request) {
        return userService.updateUserProfile(request, addressDTO);
    }
}