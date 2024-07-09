package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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

    private Date date;
    private double purchaseInvoiceRevenue;
    private double salesInvoiceRevenue;
    private double returnInvoiceRevenue;
    private int totalCustomersTransacted;
    private int purchaseInvoiceProductQuantity;
    private int salesInvoiceProductQuantity;
    private int returnInvoiceProductQuantity;
    private int totalInvoicesCreated;
    private int totalInvoicesCompleted;
    private int totalInvoicesCancelled;
    private double totalRefundAmount;
    private int totalBonusPointsAdded;
    private int totalBonusPointsDeducted;
    private int totalProductsInStockStartOfDay;
    private int totalProductsInStockEndOfDay;
    private int totalReturnedProducts;
    private String bestSellingProduct;
    private int bestSellingProductQuantity;
    private String mostStockedProduct;
    private int mostStockedProductQuantity;
    private int totalDeliveryOrders;
    private int totalPickUpOrders;
    private double totalDiscountAmount;

    @Column(name = "confirm_status")
    private boolean confirmStatus;
}
