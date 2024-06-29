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
    @Column(name = "offering_id")
    private Long offeringID;

    private String email;
    @Column(name = "offering_name")
    private String offeringName;

    @Enumerated(EnumType.STRING)
    @Column(name = "offering_type")
    private OfferingType offeringType;

    private String category;
    private String description;
    private double price;
    private String image;
    @Column(name = "is_available")
    private boolean isAvailable;
    @Column(name = "available_time")
    private String availableTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email", insertable = false, updatable = false)
    private AddressEntity address;
}
