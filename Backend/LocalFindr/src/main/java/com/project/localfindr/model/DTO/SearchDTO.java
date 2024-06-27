package com.project.localfindr.model.DTO;

import com.project.localfindr.enumeration.OfferingType;
import lombok.Data;

@Data
public class SearchDTO {
    private String name;
    private OfferingType type;
    private String category;
    private double price;
    private String streetName;
    private String localBody;
    private String city;
}
