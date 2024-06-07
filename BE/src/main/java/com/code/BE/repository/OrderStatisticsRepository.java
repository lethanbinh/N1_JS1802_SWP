package com.code.BE.repository;

import com.code.BE.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderStatisticsRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    int findTotalNumberOfOrders(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT AVG(o.finalPrice) FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    Double findAverageOrderValue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT SUM(o.finalPrice) FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    Double findTotalSales(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT FUNCTION('YEAR', o.createDate) AS year, FUNCTION('MONTH', o.createDate) AS month, COUNT(o) " +
            "FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY FUNCTION('YEAR', o.createDate), FUNCTION('MONTH', o.createDate)")
    List<Object[]> findOrderTrends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT (YEAR(CURRENT_DATE) - YEAR(c.birthday)) - (CASE WHEN MONTH(CURRENT_DATE) < MONTH(c.birthday) OR (MONTH(CURRENT_DATE) = MONTH(c.birthday) AND DAY(CURRENT_DATE) < DAY(c.birthday)) THEN 1 ELSE 0 END) AS age, COUNT(o) " +
            "FROM Order o JOIN Customer c ON o.customer.id = c.id WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY age")
    List<Object[]> findOrderNumbersByCustomerDemographics(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT COUNT(o) / COUNT(DISTINCT o.customer.id) " +
            "FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
    Double findCustomerOrderFrequency(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT AVG(order_count) " +
            "FROM (SELECT COUNT(o.id) AS order_count " +
            "      FROM orders o " +
            "      WHERE o.create_date BETWEEN :startDate AND :endDate " +
            "      GROUP BY o.customer_id) AS customer_orders",
            nativeQuery = true)
    Double findOrderAverageNumbers(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
