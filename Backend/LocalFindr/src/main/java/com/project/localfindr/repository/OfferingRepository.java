package com.project.localfindr.repository;


import com.project.localfindr.enumeration.OfferingType;
import com.project.localfindr.model.Entities.OfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferingRepository extends JpaRepository<OfferingEntity, Long> {

    @Query("SELECT o FROM OfferingEntity o JOIN o.address a WHERE " +
            "(?1 IS NULL OR o.offeringName = ?1) AND " +
            "(?2 IS NULL OR o.offeringType = ?2) AND " +
            "(?3 IS NULL OR o.category = ?3) AND " +
            "(?4 IS NULL OR o.price <= ?4) AND " +
            "(?5 IS NULL OR a.streetName = ?5) AND " +
            "(?6 IS NULL OR a.localBody = ?6) AND " +
            "(?7 IS NULL OR a.city = ?7)")
    List<OfferingEntity> findByCriteria(String name, OfferingType type, String category, Double price, String streetName, String localBody, String city);
}
