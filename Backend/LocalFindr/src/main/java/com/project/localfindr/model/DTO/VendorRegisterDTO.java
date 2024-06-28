package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

@Data
public class VendorRegisterDTO {
    private String name;
    OfferingType type;
    String category;
    String description;
    double price;
    byte[] image;
    boolean available;
    String availableTime;
}
