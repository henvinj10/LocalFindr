package com.project.localfindr.model.Entities;

import com.project.localfindr.enumeration.OfferingType;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

import java.awt.*;

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

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email", insertable = false, updatable = false)
    private RabbitConnectionDetails.Address address;
}
