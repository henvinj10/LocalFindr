package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.ProfileEntity;
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
    @Query("UPDATE address a SET a.email = :#{#updateProfileEntity.email}, a.building_info = :#{#updateProfileEntity.buildingInfo}, a.street_name = :#{#updateProfileEntity.streetName}, a.local_body = :#{#updateProfileEntity.localBody}, a.city = :#{#updateProfileEntity.city}, a.district = :#{#updateProfileEntity.district}, a.state = :#{#updateProfileEntity.state}, a.country = :#{#updateProfileEntity.country}, a.g_map = :#{#updateProfileEntity.gMap} WHERE a.email = :#{#updateProfileEntity.email}")
    Void updateProfileByEmail(UpdateProfileEntity updateProfileEntity);
}
