package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

import java.awt.*;
import java.time.OffsetDateTime;

@Data
public class VendorDTO {
    String name;
    OfferingType type;
    String category;
    String description;
    double price;
    byte[] image;
    boolean isAvailable;
    OffsetDateTime availableTime;
}
