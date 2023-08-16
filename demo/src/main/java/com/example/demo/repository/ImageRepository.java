package com.example.demo.repository;
import java.util.Optional;

import com.example.demo.entity.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
    Optional<ImageModel> findByName(String name);

    Optional<ImageModel> findByUserId(Long name);

}

