package com.code.BE.repository;

import com.code.BE.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProductStatisticsRepository extends JpaRepository<Product, Integer> {
    // product statistics

    @Query("SELECT COUNT(p) FROM Product p")
    int findTotalNumberOfProducts();

    @Query("SELECT p.name, SUM(od.productQuantity) AS quantity " +
            "FROM OrderDetail od JOIN od.product p JOIN od.order o " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY p.name " +
            "ORDER BY quantity DESC")
    List<Object[]> findTopSellingProducts(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT p.name, SUM(od.productPrice * od.productQuantity) AS totalSales " +
            "FROM OrderDetail od JOIN od.product p JOIN od.order o " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "GROUP BY p.name " +
            "ORDER BY totalSales DESC")
    List<Object[]> findSalesPerProduct(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT p.name, SUM(od.productQuantity) / COUNT(od) AS returnRate " +
            "FROM OrderDetail od " +
            "JOIN Product p ON od.product.id = p.id " +
            "JOIN Order o ON od.order.id = o.id " +
            "WHERE o.createDate BETWEEN :startDate AND :endDate AND o.type = 'return' " +
            "GROUP BY p.name")
    List<Object[]> findReturnRates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT p.name FROM Product p WHERE p.quantity <= 0")
    List<String> findProductsOutOfStock();

    @Query("SELECT AVG(s.totalSales) " +
            "FROM (SELECT SUM(od.productPrice * od.productQuantity) AS totalSales " +
            "      FROM OrderDetail od JOIN od.order o " +
            "      WHERE o.createDate BETWEEN :startDate AND :endDate " +
            "      GROUP BY od.product.id) s")
    Double findAverageSalesPerProduct(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
