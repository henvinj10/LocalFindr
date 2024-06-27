package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.OfferingEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RemoveItemRepository extends JpaRepository<OfferingEntity, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM OfferingEntity o WHERE o.offeringID = :offeringId AND o.email = :email")
    void deleteItem(Long offeringId, String email);
}
