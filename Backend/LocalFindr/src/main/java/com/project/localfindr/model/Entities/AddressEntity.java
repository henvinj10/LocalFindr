package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int address_id;
    private String building_info;
    private String street_name;
    private String local_body;
    private String city;
    private String district;
    private String state;
    private String country;
    private String g_map;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private RegisterEntity registerEntity;
}
