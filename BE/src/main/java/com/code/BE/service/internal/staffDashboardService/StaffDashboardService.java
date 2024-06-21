package com.code.BE.service.internal.staffDashboardService;

import com.code.BE.model.entity.StaffsDashboard;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface StaffDashboardService {
   StaffsDashboard getStaffsDashboard(Date startDate, Date endDate, int stallId);
}
