package com.project.localfindr.repository;

import com.project.localfindr.model.DTO.VendorDTO;
import com.project.localfindr.model.Entities.OfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorDataRepository extends JpaRepository<OfferingEntity, String> {
    @Query("SELECT o FROM OfferingEntity o WHERE o.email = :email")
    List<OfferingEntity> findByEmail(@Param("email") String email);

}
