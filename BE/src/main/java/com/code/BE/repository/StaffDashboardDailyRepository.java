package com.code.BE.repository;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.model.entity.StaffDashboardDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StaffDashboardDailyRepository extends JpaRepository<StaffDashboardDaily, Integer> {

    List<StaffDashboardDaily> findByStaffId (int id);
    List<StaffDashboardDaily> findByStallId (int id);

    @Query("SELECT new com.code.BE.model.dto.StaffDashboardDailyDTO(" +
            "DATE(:date), " +
            "SUM(CASE WHEN o.type = 'PURCHASE' THEN o.totalPrice ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'SELL' THEN o.totalPrice ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN o.totalPrice ELSE 0 END), " +
            "COUNT(DISTINCT o.customer.id), " +
            "SUM(CASE WHEN o.type = 'PURCHASE' THEN od.productQuantity ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'SELL' THEN od.productQuantity ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN od.productQuantity ELSE 0 END), " +
            "COUNT(o.id), " +
            "COUNT(CASE WHEN o.status = 'CONFIRMED' THEN o.id ELSE NULL END), " +
            "SUM(o.totalBonusPoint), " +
            "0, " + // Giá trị này cần tính toán trước đó
            "(SELECT SUM(p.quantity) FROM Product p WHERE p.stall.id = :stallId), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN od.productQuantity ELSE 0 END), " +
            "(SELECT od.productName FROM OrderDetail od JOIN od.order o WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate = :date GROUP BY od.productName ORDER BY SUM(od.productQuantity) DESC LIMIT 1), " +
            "(SELECT SUM(od.productQuantity) FROM OrderDetail od JOIN od.order o WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate = :date GROUP BY od.productName ORDER BY SUM(od.productQuantity) DESC LIMIT 1), " +
            "(SELECT od.productName FROM OrderDetail od JOIN od.order o JOIN od.product p WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate = :date GROUP BY od.productName ORDER BY SUM(p.quantity) DESC LIMIT 1), " +
            "(SELECT SUM(p.quantity) FROM OrderDetail od JOIN od.order o JOIN od.product p WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate = :date GROUP BY od.productName ORDER BY SUM(p.quantity) DESC LIMIT 1), " +
            "0, " + // Giả định không có cột discount
            "TRUE, " +
            "u.id, " +
            "st.id) " +
            "FROM Order o " +
            "JOIN o.orderDetails od " +
            "JOIN od.product p " +
            "JOIN o.staff u " +
            "JOIN u.stall st " +
            "WHERE st.id = :stallId AND o.createDate = :date " +
            "GROUP BY st.id, u.id")
    List<StaffDashboardDailyDTO> getStaffDashboardDailyData(@Param("stallId") int stallId, @Param("date") Date date);

    @Query("SELECT new com.code.BE.model.dto.StaffDashboardDailyDTO(" +
            "DATE(:startDate), " +
            "SUM(CASE WHEN o.type = 'PURCHASE' THEN o.totalPrice ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'SELL' THEN o.totalPrice ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN o.totalPrice ELSE 0 END), " +
            "COUNT(DISTINCT o.customer.id), " +
            "SUM(CASE WHEN o.type = 'PURCHASE' THEN od.productQuantity ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'SELL' THEN od.productQuantity ELSE 0 END), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN od.productQuantity ELSE 0 END), " +
            "COUNT(o.id), " +
            "COUNT(CASE WHEN o.status = 'CONFIRMED' THEN o.id ELSE NULL END), " +
            "SUM(o.totalBonusPoint), " +
            "0, " + // Giá trị này cần tính toán trước đó
            "(SELECT SUM(p.quantity) FROM Product p WHERE p.stall.id = :stallId), " +
            "SUM(CASE WHEN o.type = 'EXCHANGE_AND_RETURN' THEN od.productQuantity ELSE 0 END), " +
            "(SELECT od.productName FROM OrderDetail od JOIN od.order o WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate BETWEEN :startDate AND :endDate GROUP BY od.productName ORDER BY SUM(od.productQuantity) DESC LIMIT 1), " +
            "(SELECT SUM(od.productQuantity) FROM OrderDetail od JOIN od.order o WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate BETWEEN :startDate AND :endDate GROUP BY od.productName ORDER BY SUM(od.productQuantity) DESC LIMIT 1), " +
            "(SELECT od.productName FROM OrderDetail od JOIN od.order o JOIN od.product p WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate BETWEEN :startDate AND :endDate GROUP BY od.productName ORDER BY SUM(p.quantity) DESC LIMIT 1), " +
            "(SELECT SUM(p.quantity) FROM OrderDetail od JOIN od.order o JOIN od.product p WHERE o.staff.id = u.id AND u.stall.id = :stallId AND o.createDate BETWEEN :startDate AND :endDate GROUP BY od.productName ORDER BY SUM(p.quantity) DESC LIMIT 1), " +
            "0, " + // Giả định không có cột discount
            "TRUE) " +
            "FROM Order o " +
            "JOIN o.orderDetails od " +
            "JOIN od.product p " +
            "JOIN o.staff u " +
            "JOIN u.stall st " +
            "WHERE st.id = :stallId AND o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY st.id")
    List<StaffDashboardDailyDTO> getManagerDashboard(@Param("stallId") int stallId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
