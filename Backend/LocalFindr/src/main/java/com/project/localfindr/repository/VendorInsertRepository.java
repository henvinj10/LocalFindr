package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.OfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorInsertRepository extends JpaRepository<OfferingEntity, String> {
    Integer insertItem(OfferingEntity offeringEntity);
}