package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

@Data
public class WishlistResponseDTO {

    private int offeringID;
    private String name;
    private OfferingType type;
    private String category;
    private String description;
    private Double price;
    private byte[] image;
    private Boolean isAvailable;
    private String availableTime;
    private Address address;
}
