package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.RegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationRepository extends JpaRepository<RegisterEntity, String> {
    RegisterEntity findByEmail(String email);
}
