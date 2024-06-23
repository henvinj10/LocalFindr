package com.project.localfindr.model;

import lombok.Data;

@Data
public class AddressDTO {
    private String buildingInfo;
    private String streetName;
    private String localBody;
    private String city;
    private String state;
    private String country;
    private String gMapLink;
}
