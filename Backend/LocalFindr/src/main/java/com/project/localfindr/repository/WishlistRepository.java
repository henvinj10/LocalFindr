package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.WishlistEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, String> {
    List<WishlistEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM WishlistEntity w WHERE w.email = :email AND w.offerings.offeringID = :offeringId")
    void deleteByEmailAndOfferingId(@Param("email") String email, @Param("offeringId") Long offeringId);
}
