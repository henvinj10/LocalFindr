package com.project.localfindr.model;

import com.project.localfindr.enumeration.UserType;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
@Data
public class RegisterDTO {
    private String email;
    private String password;
    private UserType userType;
    private AddressDTO address;
}