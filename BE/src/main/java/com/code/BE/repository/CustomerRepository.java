package com.code.BE.repository;

import com.code.BE.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findById (int id);
    Customer findByPhone (String phone);
    List<Customer> findByFullNameContaining (String name);
}
