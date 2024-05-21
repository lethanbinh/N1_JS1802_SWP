package com.code.BE.repository;

import com.code.BE.model.entity.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageData, Integer> {
    ImageData findByName (String fileName);
    void deleteById(int id);
}
