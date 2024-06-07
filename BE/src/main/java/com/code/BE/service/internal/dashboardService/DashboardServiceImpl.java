package com.code.BE.service.internal.dashboardService;

import com.code.BE.model.entity.OrderStatistics;
import com.code.BE.model.entity.ProductStatistics;
import com.code.BE.model.entity.RevenueStatistics;
import com.code.BE.model.entity.StaffStatistics;
import com.code.BE.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private RevenueStatisticsRepository revenueStatisticsRepository;

    @Autowired
    private OrderStatisticsRepository orderStatisticsRepository;

    @Autowired
    private ProductStatisticsRepository productStatisticsRepository;

    @Autowired
    private StaffStatisticsRepository staffStatisticsRepository;

    @Override
    public RevenueStatistics getRevenueStatistics(Date startDate, Date endDate, Date previousStartDate, Date previousEndDate) {
        Double totalRevenue = revenueStatisticsRepository.findTotalRevenue(startDate, endDate);

        List<Object[]> revenuePerStallRaw = revenueStatisticsRepository.findRevenuePerStall(startDate, endDate);
        Map<String, Double> revenuePerStall = new HashMap<>();
        for (Object[] revenue : revenuePerStallRaw) {
            revenuePerStall.put((String) revenue[0], (Double) revenue[1]);
        }

        double revenueGrowthRate = revenueStatisticsRepository.findRevenueGrowthRate(startDate, endDate, previousStartDate, previousEndDate);

        List<String> topPerformingStalls = revenueStatisticsRepository.findTopPerformingStalls(startDate, endDate);

        List<Object[]> monthlyQuarterlyRevenueTrendsRaw = revenueStatisticsRepository.findMonthlyQuarterlyRevenueTrends(startDate, endDate);
        Map<String, List<Double>> monthlyQuarterlyRevenueTrends = new HashMap<>();
        for (Object[] trend : monthlyQuarterlyRevenueTrendsRaw) {
            String period = "Month: " + trend[0] + ", Quarter: " + trend[1];
            monthlyQuarterlyRevenueTrends.computeIfAbsent(period, k -> new ArrayList<>()).add((Double) trend[2]);
        }

        double averageRevenuePerStall = revenueStatisticsRepository.findAverageRevenuePerStall(startDate, endDate);

        return new RevenueStatistics(
                totalRevenue,
                revenuePerStall,
                revenueGrowthRate,
                topPerformingStalls,
                monthlyQuarterlyRevenueTrends,
                averageRevenuePerStall
        );
    }

    @Override
    public OrderStatistics getOrderStatistics(Date startDate, Date endDate) {
        int totalNumberOfOrders = orderStatisticsRepository.findTotalNumberOfOrders(startDate, endDate);
        Double averageOrderValue = orderStatisticsRepository.findAverageOrderValue(startDate, endDate);
        Double totalSales = orderStatisticsRepository.findTotalSales(startDate, endDate);

        List<Object[]> orderTrendsRaw = orderStatisticsRepository.findOrderTrends(startDate, endDate);
        Map<String, Integer> orderTrends = new HashMap<>();
        for (Object[] trend : orderTrendsRaw) {
            String period = trend[0] + "-" + trend[1];
            orderTrends.put(period, ((Number) trend[2]).intValue());
        }

        Double customerOrderFrequency = orderStatisticsRepository.findCustomerOrderFrequency(startDate, endDate);
        Double orderAverageNumbers = orderStatisticsRepository.findOrderAverageNumbers(startDate, endDate);

        List<Object[]> orderNumbersByCustomerDemographicsRaw = orderStatisticsRepository.findOrderNumbersByCustomerDemographics(startDate, endDate);
        Map<String, Integer> orderNumbersByCustomerDemographics = new HashMap<>();
        for (Object[] demographic : orderNumbersByCustomerDemographicsRaw) {
            orderNumbersByCustomerDemographics.put(String.valueOf(demographic[0]), ((Number) demographic[1]).intValue());
        }

        return new OrderStatistics(
                totalNumberOfOrders,
                averageOrderValue != null ? averageOrderValue : 0.0,
                totalSales != null ? totalSales : 0.0,
                orderTrends,
                customerOrderFrequency != null ? customerOrderFrequency : 0.0,
                orderAverageNumbers != null ? orderAverageNumbers : 0.0,
                orderNumbersByCustomerDemographics
        );
    }

    @Override
    public ProductStatistics getProductStatistics(Date startDate, Date endDate) {
        int totalNumberOfProducts = productStatisticsRepository.findTotalNumberOfProducts();

        List<Object[]> topSellingProductsRaw = productStatisticsRepository.findTopSellingProducts(startDate, endDate);

        Map<String, Long> topSellingProducts = new HashMap<>();
        for (Object[] sales : topSellingProductsRaw) {
            topSellingProducts.put((String) sales[0], (Long)sales[1]);
        }

        List<Object[]> salesPerProductRaw = productStatisticsRepository.findSalesPerProduct(startDate, endDate);
        Map<String, Double> salesPerProduct = new HashMap<>();
        for (Object[] sales : salesPerProductRaw) {
            salesPerProduct.put((String) sales[0], (Double) sales[1]);
        }

        List<Object[]> returnRatesRaw = productStatisticsRepository.findReturnRates(startDate, endDate);
        Map<String, Double> returnRates = new HashMap<>();
        for (Object[] rate : returnRatesRaw) {
            returnRates.put((String) rate[0], (Double) rate[1]);
        }

        List<String> productsOutOfStock = productStatisticsRepository.findProductsOutOfStock();

        Double averageSalesPerProduct = productStatisticsRepository.findAverageSalesPerProduct(startDate, endDate);

        return new ProductStatistics(
                totalNumberOfProducts,
                topSellingProducts,
                salesPerProduct,
                returnRates,
                productsOutOfStock,
                averageSalesPerProduct != null ? averageSalesPerProduct : 0.0
        );
    }

    @Override
    public StaffStatistics getStaffStatistics(Date startDate, Date endDate) {
        int totalNumberOfStaff = staffStatisticsRepository.findTotalNumberOfStaff(startDate, endDate);

        List<Object[]> revenuePerStaffRaw = staffStatisticsRepository.findRevenuePerStaff(startDate, endDate);
        Map<String, Double> revenuePerStaff = new HashMap<>();
        for (Object[] revenue : revenuePerStaffRaw) {
            revenuePerStaff.put((String) revenue[0], (Double) revenue[1]);
        }

        List<String> topPerformingStaff = staffStatisticsRepository.findTopPerformingStaff(startDate, endDate);

        Double averageSalesPerStaff = staffStatisticsRepository.findAverageSalesPerStaff(startDate, endDate);

        List<Object[]> ordersPerStaffRaw = staffStatisticsRepository.findOrdersPerStaff(startDate, endDate);
        Map<String, Integer> ordersPerStaff = new HashMap<>();
        for (Object[] orders : ordersPerStaffRaw) {
            ordersPerStaff.put((String) orders[0], ((Number) orders[1]).intValue());
        }

        double averageOrdersPerStaff = (double) (ordersPerStaffRaw.size() / totalNumberOfStaff);

        return new StaffStatistics(
                totalNumberOfStaff,
                revenuePerStaff,
                topPerformingStaff,
                averageSalesPerStaff != null ? averageSalesPerStaff : 0.0,
                ordersPerStaff,
                averageOrdersPerStaff
        );
    }
}
