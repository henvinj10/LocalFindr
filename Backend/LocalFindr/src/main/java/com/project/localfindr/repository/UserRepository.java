package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<ProfileEntity, String> {
    ProfileEntity findByEmail(String email);
}