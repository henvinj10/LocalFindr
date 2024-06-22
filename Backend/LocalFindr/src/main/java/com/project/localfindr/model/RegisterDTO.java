package com.project.localfindr.model;

import com.project.localfindr.enumeration.UserType;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String mobileNumber;
    private UserType userType;
}
