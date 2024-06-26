package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

import java.awt.*;

@Data
public class SearchResponseDTO {

    private int offeringID;
    private String name;
    private OfferingType type;
    private String category;
    private String description;
    private Double price;
    private Image image;
    private Boolean isAvailable;
    private String availableTime;
    private AddressDTO addressDTO;
}
