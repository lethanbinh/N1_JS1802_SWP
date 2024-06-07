package com.code.BE.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffStatistics {
    private int totalNumberOfStaff;
    private Map<String, Double> revenuePerStaff; // Staff username -> revenue
    private List<String> topPerformingStaff; // List of top-performing staff name by revenue
    private double averageSalesPerStaff;
    private Map<String, Integer> ordersPerStaff; // staff name -> order of this staff
    private double averageOrdersPerStaff;
}