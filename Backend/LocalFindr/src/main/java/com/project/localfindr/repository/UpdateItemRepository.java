package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.OfferingEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateItemRepository extends JpaRepository<OfferingEntity, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE OfferingEntity o SET " +
            "o.offeringName = COALESCE(:#{#offeringEntity.offeringName}, o.offeringName), " +
            "o.offeringType = COALESCE(:#{#offeringEntity.offeringType}, o.offeringType), " +
            "o.category = COALESCE(:#{#offeringEntity.category}, o.category), " +
            "o.description = COALESCE(:#{#offeringEntity.description}, o.description), " +
            "o.price = COALESCE(NULLIF(:#{#offeringEntity.price}, 0), o.price), " +
            "o.image = COALESCE(:#{#offeringEntity.image}, o.image), " +
            "o.isAvailable = COALESCE(:#{#offeringEntity.isAvailable}, o.isAvailable), " +
            "o.availableTime = COALESCE(:#{#offeringEntity.availableTime}, o.availableTime) " +
            "WHERE o.email = :#{#offeringEntity.email} AND o.offeringID = :#{#offeringEntity.offeringID}")
    void updateItem(@Param("offeringEntity") OfferingEntity offeringEntity);
}