package com.project.localfindr.repository;

import com.project.localfindr.model.Entities.WishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, String> {
}
