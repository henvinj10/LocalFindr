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
    @Query("UPDATE UpdateProfileEntity u SET " +
            "u.buildingInfo = COALESCE(:#{#updateProfileEntity.buildingInfo}, u.buildingInfo), " +
            "u.streetName = COALESCE(:#{#updateProfileEntity.streetName}, u.streetName), " +
            "u.localBody = COALESCE(:#{#updateProfileEntity.localBody}, u.localBody), " +
            "u.city = COALESCE(:#{#updateProfileEntity.city}, u.city), " +
            "u.district = COALESCE(:#{#updateProfileEntity.district}, u.district), " +
            "u.state = COALESCE(:#{#updateProfileEntity.state}, u.state), " +
            "u.country = COALESCE(:#{#updateProfileEntity.country}, u.country), " +
            "u.gMap = COALESCE(:#{#updateProfileEntity.gMap}, u.gMap) " +
            "WHERE u.email = :#{#updateProfileEntity.email}")
    void updateProfileByEmail(@Param("updateProfileEntity") UpdateProfileEntity updateProfileEntity);
}
