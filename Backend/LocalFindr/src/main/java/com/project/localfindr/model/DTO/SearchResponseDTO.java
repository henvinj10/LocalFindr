package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

@Data
public class SearchResponseDTO {

    private int offeringID;
    private String name;
    private OfferingType type;
    private String category;
    private String description;
    private Double price;
    private String image;
    private Boolean available;
    private String availableTime;
    private Address address;
}
