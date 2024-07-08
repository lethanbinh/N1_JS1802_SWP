package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDashboardDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @PositiveOrZero
    @Column(name = "purchase_amount")
    private double purchaseAmount;          // Số tiền mua lại hàng trong ngày

    @PositiveOrZero
    @Column(name = "return_amount")
    private double returnAmount;            // Số tiền đổi trả

    @PositiveOrZero
    @Column(name = "daily_revenue")
    private double dailyRevenue;            // Doanh thu bán trong ngày

    @PositiveOrZero
    @Column(name = "sold_product_count")
    private int soldProductCount;        // Số lượng sản phẩm bán

    @PositiveOrZero
    @Column(name = "purchased_amount")
    private int repurchasedProductCount; // Số lượng sản phẩm mua lại

    @PositiveOrZero
    @Column(name = "returned_product_count")
    private int returnedProductCount;    // Số lượng sản phẩm đổi trả

    @PositiveOrZero
    @Column(name = "total_customers")
    private int totalCustomers;             // Tổng số khách hàng giao dịch

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @Column(name = "confirm_status")
    private boolean confirmStatus;
}
