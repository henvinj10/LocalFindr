package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.UserType;
import lombok.Data;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String mobileNumber;
    private UserType userType;
}
