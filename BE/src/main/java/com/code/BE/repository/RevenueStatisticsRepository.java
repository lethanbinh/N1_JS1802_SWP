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
    // Revenue statistics
    @Query("SELECT SUM(o.finalPrice) FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    Double findTotalRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT s.name, SUM(od.productPrice * od.productQuantity) FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name")
    List<Object[]> findRevenuePerStall(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT COALESCE(AVG(sub.totalRevenue), 0.0) FROM (" +
            "SELECT SUM(od.productPrice * od.productQuantity) AS totalRevenue FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name) sub")
    Double findAverageRevenuePerStall(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT COALESCE(((SUM(o1.finalPrice) - SUM(o2.finalPrice)) / NULLIF(SUM(o2.finalPrice), 0)) * 100, 0.0) " +
            "FROM Order o1, Order o2 " +
            "WHERE o1.createDate BETWEEN :currentStartDate AND :currentEndDate " +
            "AND o2.createDate BETWEEN :previousStartDate AND :previousEndDate")
    Double findRevenueGrowthRate(@Param("currentStartDate") Date currentStartDate,
                                 @Param("currentEndDate") Date currentEndDate,
                                 @Param("previousStartDate") Date previousStartDate,
                                 @Param("previousEndDate") Date previousEndDate);

    @Query("SELECT s.name FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN od.product p " +
            "JOIN p.stall s " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.name " +
            "ORDER BY SUM(od.productPrice * od.productQuantity) DESC")
    List<String> findTopPerformingStalls(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT FUNCTION('MONTH', o.createDate) AS month, FUNCTION('QUARTER', o.createDate) AS quarter, SUM(o.finalPrice) " +
            "FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate GROUP BY FUNCTION('MONTH', o.createDate), FUNCTION('QUARTER', o.createDate)")
    List<Object[]> findMonthlyQuarterlyRevenueTrends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}