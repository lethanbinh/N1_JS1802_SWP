package com.code.BE.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatistics {
    private int totalNumberOfOrders;
    private double averageOrderValue;
    private double totalSales;
    private Map<String, List<Integer>> orderTrends; // Period -> order counts
    private double customerOrderFrequency;
    private double orderAverageNumbers;
    private Map<String, Integer> orderNumbersByCustomerDemographics; // Age/Gender -> order counts
}