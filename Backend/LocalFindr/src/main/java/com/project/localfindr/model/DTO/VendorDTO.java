package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

import java.awt.*;
// Same as offering entity
@Data
public class VendorDTO {
    private int offeringID;
    private String name;
    private OfferingType type;
    private String category;
    private String description;
    private double price;
    private Image image;
    private boolean isAvailable;
    private String availableTime;
}
