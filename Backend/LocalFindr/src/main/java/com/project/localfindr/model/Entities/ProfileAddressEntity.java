package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class ProfileAddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addressId;
    private String buildingInfo;
    private String streetName;
    private String localBody;
    private String city;
    private String district;
    private String state;
    private String country;
    private String gMap;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private ProfileEntity profileEntity;
}
