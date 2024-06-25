package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.UpdateProfileEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileUpdateRepository extends JpaRepository<UpdateProfileEntity, String> {
    @Transactional
    @Modifying
    @Query("UPDATE UpdateProfileEntity u SET u.buildingInfo = :#{#updateProfileEntity.buildingInfo}, u.streetName = :#{#updateProfileEntity.streetName}, u.localBody = :#{#updateProfileEntity.localBody}, u.city = :#{#updateProfileEntity.city}, u.district = :#{#updateProfileEntity.district}, u.state = :#{#updateProfileEntity.state}, u.country = :#{#updateProfileEntity.country}, u.gMap = :#{#updateProfileEntity.gMap} WHERE u.email = :#{#updateProfileEntity.email}")
    void updateProfileByEmail(@Param("updateProfileEntity") UpdateProfileEntity updateProfileEntity);
}