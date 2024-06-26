package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class ProfileAddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int addressId;
    @Column(name = "building_info")
    private String buildingInfo;
    @Column(name = "street_name")
    private String streetName;
    @Column(name = "local_body")
    private String localBody;
    private String city;
    private String district;
    private String state;
    private String country;
    @Column(name = "g_map")
    private String gMap;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private ProfileEntity profileEntity;
}
