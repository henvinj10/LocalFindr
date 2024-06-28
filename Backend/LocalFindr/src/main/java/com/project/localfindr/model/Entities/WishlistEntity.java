package com.project.localfindr.model.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wishlist", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email", "offering_id"})
})
public class WishlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    private int wishId;

    @Column(nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offering_id", referencedColumnName = "offering_id", nullable = false)
    private OfferingEntity offerings;

    public Integer getOfferingID() {
        return offerings != null ? offerings.getOfferingID().intValue() : null;
    }

    public void setOfferingID(Integer offeringID) {
        if (offerings == null) {
            offerings = new OfferingEntity();
        }
        offerings.setOfferingID(Long.valueOf(offeringID));
    }
}
