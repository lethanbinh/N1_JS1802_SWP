package com.code.BE.service.internal.dashboardService;

import com.code.BE.model.entity.OrderStatistics;
import com.code.BE.model.entity.ProductStatistics;
import com.code.BE.model.entity.RevenueStatistics;
import com.code.BE.model.entity.StaffStatistics;

import java.util.Date;

public interface DashboardService {
    RevenueStatistics getRevenueStatistics(Date startDate, Date endDate, Date previousStartDate, Date previousEndDate);
    OrderStatistics getOrderStatistics(Date startDate, Date endDate);
    ProductStatistics getProductStatistics(Date startDate, Date endDate);
    StaffStatistics getStaffStatistics(Date startDate, Date endDate);
}
