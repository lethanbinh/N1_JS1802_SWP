package com.code.BE.repository;

import com.code.BE.model.entity.WarrantyCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarrantyCardRepository extends JpaRepository<WarrantyCard, Integer> {
    WarrantyCard findById (int promotionId);
}
