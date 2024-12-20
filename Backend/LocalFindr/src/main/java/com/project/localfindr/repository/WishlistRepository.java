package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.WishlistEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {
    List<WishlistEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM WishlistEntity w WHERE w.email = :email AND w.offerings.offeringID = :offeringId")
    void deleteByEmailAndOfferingId(@Param("email") String email, @Param("offeringId") Long offeringId);

    @Transactional
    @Query("SELECT w FROM WishlistEntity w WHERE w.email = :email AND w.offerings.offeringID = :offeringID")
    Optional<WishlistEntity> findByEmailAndOfferingID(@Param("email") String email, @Param("offeringID") Long offeringID);
}
