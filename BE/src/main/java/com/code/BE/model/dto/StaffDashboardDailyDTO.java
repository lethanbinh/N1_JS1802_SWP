package com.code.BE.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDashboardDailyDTO {
    private Date date;
    private double purchaseInvoiceRevenue;
    private double salesInvoiceRevenue;
    private double returnInvoiceRevenue;
    private long totalCustomersTransacted;
    private long purchaseInvoiceProductQuantity;
    private long salesInvoiceProductQuantity;
    private long returnInvoiceProductQuantity;
    private long totalInvoicesCreated;
    private long totalInvoicesCompleted;
    private double totalBonusPointsAdded;
    private int totalProductsInStockStartOfDay;
    private long totalProductsInStockEndOfDay;
    private long totalReturnedProducts;
    private String bestSellingProduct;
    private long bestSellingProductQuantity;
    private String mostStockedProduct;
    private long mostStockedProductQuantity;
    private double totalDiscountAmount;
    private boolean confirmStatus;
    private int staffId;
    private int stallId;
}
