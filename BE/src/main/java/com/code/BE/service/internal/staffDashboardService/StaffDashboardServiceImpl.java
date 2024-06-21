package com.code.BE.service.internal.staffDashboardService;

import com.code.BE.model.entity.StaffsDashboard;
import com.code.BE.repository.StaffDashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class StaffDashboardServiceImpl implements StaffDashboardService {

    @Autowired
    private StaffDashboardRepository staffDashboardRepository;

    @Override
    public StaffsDashboard getStaffsDashboard(Date startDate, Date endDate, int stallId) {
        // Fetch the statistics from the repository
        List<Object[]> results = staffDashboardRepository.findStaffStatistics(startDate, endDate, stallId);

        // Assuming results is not empty and has a single row (as it should be based on the query)
        if (results.isEmpty()) {
            return new StaffsDashboard(0.0, 0L, 0L, 0L, 0.0, 0L); // Return default values if no data is found
        }

        Object[] stats = results.get(0);

        // Map the results to the StaffsDashboard object
        StaffsDashboard staffDashboard = new StaffsDashboard(
                (Double) stats[0], // totalRevenue
                (Long) stats[1], // totalNumberOfSales
                (Long) stats[2], // totalStallQuantity
                (Long) stats[3], // totalCustomersServed
                (Double) stats[4], // dailyTransactionAmount
                (Long) stats[5] // dailySalesQuantity
        );

        return staffDashboard;
    }
}
