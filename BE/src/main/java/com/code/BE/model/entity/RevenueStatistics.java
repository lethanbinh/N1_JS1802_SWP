package com.code.BE.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueStatistics {
    private Double totalRevenue;
    private Map<String, Double> revenuePerStall; // Stall name -> revenue
    private List<String> topPerformingStalls;
    private Map<String, List<Double>> monthlyQuarterlyRevenueTrends; // Period -> revenue trends
    private Double averageRevenuePerStall;
}