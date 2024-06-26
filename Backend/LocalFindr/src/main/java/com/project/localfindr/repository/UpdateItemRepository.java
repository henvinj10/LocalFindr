package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.model.Entities.UpdateProfileEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateItemRepository extends JpaRepository<OfferingEntity, String> {
    @Transactional
    @Modifying
    @Query("UPDATE offerings o SET o.offeringName = :#{#offeringEntity.offeringName}, o.offeringType = :#{#offeringEntity.offeringType}, o.category = :#{#offeringEntity.category}, o.description = :#{#offeringEntity.description}, o.price = :#{#offeringEntity.price}, o.image = :#{#offeringEntity.image}, o.isAvailable = :#{#offeringEntity.isAvailable}, o.availableTime = :#{#offeringEntity.availableTime} WHERE o.email = :#{#offeringEntity.email} AND o.offeringId = :#{#offeringEntity.offeringId}")
    void updateItem(@Param("offeringEntity") OfferingEntity offeringEntity);
}
