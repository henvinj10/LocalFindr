package com.project.localfindr.model.DTO;

import lombok.Data;

@Data
public class AddressDTO {
    private String buildingInfo;
    private String streetName;
    private String localBody;
    private String city;
    private String district;
    private String country;
    private String gMapLink;
}
