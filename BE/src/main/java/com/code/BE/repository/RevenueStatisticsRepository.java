package com.code.BE.repository;

import com.code.BE.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RevenueStatisticsRepository extends JpaRepository<Order, Integer> {
    // Tổng doanh thu của tất cả các quầy
    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    Double findTotalRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Doanh thu theo từng quầy hàng
    @Query("SELECT s.name, COALESCE(SUM(od.totalPrice), 0) FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name")
    List<Object[]> findRevenuePerStall(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Doanh thu trung bình trên mỗi quầy hàng
    @Query("SELECT COALESCE(AVG(sub.totalRevenue), 0.0) FROM (" +
            "SELECT COALESCE(SUM(od.totalPrice), 0) AS totalRevenue FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name) sub")
    Double findAverageRevenuePerStall(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Các quầy hàng hoạt động tốt nhất
    @Query("SELECT s.name FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name " +
            "ORDER BY SUM(od.totalPrice) DESC")
    List<String> findTopPerformingStalls(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Xu hướng doanh thu hàng tháng và hàng quý
    @Query("SELECT FUNCTION('MONTH', o.createDate) AS month, FUNCTION('QUARTER', o.createDate) AS quarter, COALESCE(SUM(o.totalPrice), 0) " +
            "FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate GROUP BY FUNCTION('MONTH', o.createDate), FUNCTION('QUARTER', o.createDate)")
    List<Object[]> findMonthlyQuarterlyRevenueTrends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
