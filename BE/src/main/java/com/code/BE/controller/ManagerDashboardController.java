package com.code.BE.controller;

import com.code.BE.service.external.dateService.DateConvertService;
import com.code.BE.service.internal.dashboardService.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/manager-dashboard")
@PreAuthorize(value = "hasAuthority('ROLE_MANAGER')")
public class ManagerDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DateConvertService dateConvertService;
}
