package com.code.BE.controller;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.model.mapper.StaffDashboardMapper;
import com.code.BE.repository.StallRepository;
import com.code.BE.repository.UserRepository;
import com.code.BE.service.external.dateService.DateConvertService;
import com.code.BE.service.internal.dashboardService.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/manager-dashboard")
@PreAuthorize(value = "hasAuthority('ROLE_MANAGER')")
public class ManagerDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DateConvertService dateConvertService;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffDashboardMapper staffDashboardMapper;

    @GetMapping("/manager-dashboard/stall")
    public List<StaffDashboardDailyDTO> getManagerDashboardStall(@RequestParam int stallId, @RequestParam String startDate, @RequestParam String endDate) {
        Date start = dateConvertService.convertToDate(startDate);
        Date end = dateConvertService.convertToDate(endDate);

        List<StaffDashboardDailyDTO> staffDashboardList = staffDashboardMapper.toResponseList(stallRepository.findById(stallId).getStaffDashboardDailies());

        return staffDashboardList.stream()
                .filter(d -> !d.getDate().before(start) && !d.getDate().after(end))
                .collect(Collectors.toList());
    }

    @GetMapping("/manager-dashboard/staff")
    public List<StaffDashboardDailyDTO> getManagerDashboardStaff(@RequestParam int staffId, @RequestParam String startDate, @RequestParam String endDate) {
        Date start = dateConvertService.convertToDate(startDate);
        Date end = dateConvertService.convertToDate(endDate);

        List<StaffDashboardDailyDTO> staffDashboardList = staffDashboardMapper.toResponseList(userRepository.findById(staffId).getStaffDashboardDailies());

        return staffDashboardList.stream()
                .filter(d -> !d.getDate().before(start) && !d.getDate().after(end))
                .collect(Collectors.toList());
    }
}
