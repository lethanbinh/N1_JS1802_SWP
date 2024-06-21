package com.code.BE.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffsDashboard {
    private Double totalRevenue;
    private Long totalNumberOfSales;
    private Long totalStallQuantity;
    private Long totalCustomersServed;
    private Double dailyTransactionAmount;
    private Long dailySalesQuantity;
}
