package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.UserType;
import lombok.Data;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private UserType userType;
    private AddressDTO addressDTO;
}
