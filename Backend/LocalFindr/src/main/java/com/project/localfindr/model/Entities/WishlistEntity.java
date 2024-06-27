package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wishlist")
public class WishlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    private int wishId;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offering_id", referencedColumnName = "offering_id")
    private OfferingEntity offerings;

    public Integer getOfferingID() {
        return Math.toIntExact(offerings != null ? offerings.getOfferingID() : null);
    }

    public void setOfferingID(Integer offeringID) {
        if (offerings == null) {
            offerings = new OfferingEntity();
        }
        offerings.setOfferingID(Long.valueOf(offeringID));
    }
}
