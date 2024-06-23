package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.UserType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

@Data
public class RegisterDTO {
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    private AddressDTO addressDTO;
}
