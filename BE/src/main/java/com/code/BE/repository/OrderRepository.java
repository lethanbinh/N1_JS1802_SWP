package com.code.BE.repository;

import com.code.BE.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findById(int id);
    List<Order> findByStaffFullNameContaining(String name);
    List<Order> findByCustomerFullNameContaining(String name);
}
