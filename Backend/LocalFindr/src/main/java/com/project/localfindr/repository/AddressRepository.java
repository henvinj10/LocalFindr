package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {
    AddressEntity findByRegisterEntityEmail(String email);
}