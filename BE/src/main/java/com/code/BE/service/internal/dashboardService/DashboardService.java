package com.code.BE.service.internal.dashboardService;

import com.code.BE.model.dto.StaffDashboardDailyDTO;

import java.util.Date;
import java.util.List;

public interface DashboardService {
    List<StaffDashboardDailyDTO> getStaffDashboardData(int stallId, Date date);
    List<StaffDashboardDailyDTO> getManagerDashboard (int stallId, Date startDate, Date endDate);
    StaffDashboardDailyDTO save (StaffDashboardDailyDTO staffDashboardDailyDTO);
    List<StaffDashboardDailyDTO> findByStaffId (int id);

    List<StaffDashboardDailyDTO> findByStallId(int id);
}
