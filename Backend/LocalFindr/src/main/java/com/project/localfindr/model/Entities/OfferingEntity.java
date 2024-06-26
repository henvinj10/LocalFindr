package com.project.localfindr.model.Entities;

import com.project.localfindr.enumeration.OfferingType;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

import java.awt.*;
import java.util.Set;

@Data
@Entity
@Table(name = "offerings")
public class OfferingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int offeringID;

    private String email;
    private String offeringName;
    private OfferingType offeringType;
    private String category;
    private String description;
    private double price;
    private Image image;
    private boolean isAvailable;
    private String availableTime;
}
