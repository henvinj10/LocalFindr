package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.UserType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class ProfileDTO {
    private String email;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    private AddressDTO addressDTO;
}
