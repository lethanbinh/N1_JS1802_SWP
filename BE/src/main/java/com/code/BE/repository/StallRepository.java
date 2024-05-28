package com.code.BE.repository;

import com.code.BE.model.entity.Stall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StallRepository extends JpaRepository<Stall, Integer> {
    Stall findById (int id);
    Stall findByCode (String code);
    List<Stall> findByNameContaining (String name);
}
