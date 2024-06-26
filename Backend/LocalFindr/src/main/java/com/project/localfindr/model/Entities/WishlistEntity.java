package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wishlist")
public class WishlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wishId;
    private String email;
    private int offeringID;
}
