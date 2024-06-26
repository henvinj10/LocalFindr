package com.project.localfindr.repository;


import com.project.localfindr.enumeration.OfferingType;
import com.project.localfindr.model.Entities.OfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferingRepository extends JpaRepository<OfferingEntity, Integer> {

    @Query("SELECT o FROM Offering o WHERE "
            + "(?1 IS NULL OR o.offering_name = ?1) AND "
            + "(?2 IS NULL OR o.offering_type = ?2) AND "
            + "(?3 IS NULL OR o.category = ?3) AND "
            + "(?4 IS NULL OR o.price = ?4) AND "
            + "(?5 IS NULL OR o.address.streetName = ?5) AND "
            + "(?6 IS NULL OR o.address.localBody = ?6) AND "
            + "(?7 IS NULL OR o.address.city = ?7)")
    List<OfferingEntity> findByCriteria(String name, OfferingType type, String category, Double price, String streetName, String localBody, String city);
}
