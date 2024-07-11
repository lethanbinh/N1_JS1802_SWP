package com.code.BE.controller;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.repository.StaffDashboardDailyRepository;
import com.code.BE.repository.StallRepository;
import com.code.BE.repository.UserRepository;
import com.code.BE.service.external.dateService.DateConvertService;
import com.code.BE.service.internal.dashboardService.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/staff-dashboard")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class StaffDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DateConvertService dateConvertService;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/staff-dashboard-daily")
    public List<StaffDashboardDailyDTO> getStaffDashboardData(@RequestParam int stallId, @RequestParam String date) {
        return dashboardService.getStaffDashboardData(stallId, dateConvertService.convertToDate(date));
    }

    @PostMapping("/staff-dashboard-daily")
    public StaffDashboardDailyDTO confirmDashboard(@RequestBody StaffDashboardDailyDTO staffDashboardDailyDTO) {
        return dashboardService.save(staffDashboardDailyDTO);
    }

    @GetMapping("/check-dashboard-daily")
    public boolean checkStaffDashboard(@RequestParam int staffId, @RequestParam String date) {
        if (!dashboardService.findByStaffId(staffId).isEmpty()) {
            for (StaffDashboardDailyDTO staffDashboardDailyDTO : dashboardService.findByStaffId(staffId)) {
                if (staffDashboardDailyDTO.getDate().getDay() == dateConvertService.convertToDate(date).getDay()) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    @GetMapping("/staff-dashboard-checked")
    public StaffDashboardDailyDTO getStaffDashboardDataAfterConfirm(@RequestParam int stallId, @RequestParam String date) {
        if (!dashboardService.findByStallId(stallId).isEmpty()) {
            for (StaffDashboardDailyDTO staffDashboardDailyDTO : dashboardService.findByStallId(stallId)) {
                if (staffDashboardDailyDTO.getDate().getDay() == dateConvertService.convertToDate(date).getDay()) {
                    return staffDashboardDailyDTO;
                }
            }
            return null;
        }
        return null;
    }
}
