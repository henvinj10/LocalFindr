package com.project.localfindr.model.Entities;

import com.project.localfindr.enumeration.UserType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class ProfileEntity {

    @Id
    private String email;
    private String userPassword;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @OneToOne(mappedBy = "profileEntity", cascade = CascadeType.ALL)
    private ProfileAddressEntity profileAddressEntity;
}


