package com.code.BE.repository;

import com.code.BE.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StaffDashboardRepository extends JpaRepository<User, Integer> {

    @Query("SELECT ( " +
            "SUM(o.totalPrice), " +
            "SUM(od.productQuantity), " +
            "SUM(p.quantity), " +
            "COUNT(DISTINCT o.customer.id), " +
            "SUM(o.totalPrice), " +
            "SUM(od.productQuantity) " +
            ") " +
            "FROM Order o " +
            "JOIN o.orderDetails od " +
            "JOIN od.product p " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate AND p.stall.id = :stallId")
    List<Object[]> findStaffStatistics(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("stallId") int stallId);
}
