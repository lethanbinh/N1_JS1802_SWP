package com.code.BE.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStatistics {
    private int totalNumberOfProducts;
    private Map<String, Long> topQuantitySellingProducts; // List of top-selling product names
    private Map<String, Double> topSalesPerProduct; // Product name -> sales
    private Map<String, Double> returnRates; // Product name -> return rate
    private List<String> productsOutOfStock; // List of product names with low stock
    private double averageSalesPerProduct;
}