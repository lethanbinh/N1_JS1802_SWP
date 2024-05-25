package com.code.BE.repository;

import com.code.BE.model.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    OrderDetail findById (int id);
    List<OrderDetail> findByOrderId (int id);
}
