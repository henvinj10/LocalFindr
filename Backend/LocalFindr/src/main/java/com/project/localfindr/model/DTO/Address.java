package com.project.localfindr.model.DTO;

import lombok.Data;

@Data
public class Address {
    private String buildingInfo;
    private String streetName;
    private String localBody;
    private String city;
    private String district;
    private String state;
    private String country;
    private String gMapLink;
}
