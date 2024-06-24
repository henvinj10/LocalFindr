package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class UpdateProfileEntity {
    private String email;
    private String buildingInfo;
    private String streetName;
    private String localBody;
    private String city;
    private String district;
    private String state;
    private String country;
    private String gMap;
}
