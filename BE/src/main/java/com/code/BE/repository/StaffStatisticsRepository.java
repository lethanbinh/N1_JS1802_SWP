package com.code.BE.repository;

import com.code.BE.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StaffStatisticsRepository extends JpaRepository<User, Integer> {
    @Query("SELECT COUNT(u) FROM User u JOIN u.role r WHERE r.name = 'staff' AND u.registerDate BETWEEN :startDate AND :endDate")
    int findTotalNumberOfStaff(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT u.username, SUM(o.finalPrice) AS totalRevenue " +
            "FROM Order o JOIN o.staff u " +
            "WHERE u.role.name = 'staff' AND o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY u.username")
    List<Object[]> findRevenuePerStaff(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT u.username FROM Order o JOIN o.staff u " +
            "WHERE u.role.name = 'staff' AND o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY u.username " +
            "ORDER BY SUM(o.finalPrice) DESC")
    List<String> findTopPerformingStaff(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT AVG(s.totalSales) " +
            "FROM (SELECT SUM(o.finalPrice) AS totalSales " +
            "      FROM Order o JOIN o.staff u " +
            "      WHERE u.role.name = 'staff' AND o.createDate BETWEEN :startDate AND :endDate " +
            "      GROUP BY u.id) s")
    Double findAverageSalesPerStaff(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT u.username, COUNT(o) " +
            "FROM Order o JOIN o.staff u " +
            "WHERE u.role.name = 'staff' AND o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY u.username")
    List<Object[]> findOrdersPerStaff(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
