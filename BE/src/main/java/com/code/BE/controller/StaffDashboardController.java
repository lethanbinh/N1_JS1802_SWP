package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.entity.StaffsDashboard;
import com.code.BE.service.external.dateService.DateConvertService;
import com.code.BE.service.internal.staffDashboardService.StaffDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/staffs-dashboard")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class StaffDashboardController {

    @Autowired
    private StaffDashboardService staffDashboardService;

    @Autowired
    private DateConvertService dateConvertService;

    @GetMapping(value = "/staff-dashboard/{startDate}/{endDate}/{stallId}")
    public ResponseEntity<StaffsDashboard> getStaffDashboardByStall(
            @PathVariable String startDate,
            @PathVariable String endDate,
            @PathVariable int stallId
    ) {
        try {
            Date startDateConvert = dateConvertService.convertToDate(startDate);
            Date endDateConvert = dateConvertService.convertToDate(endDate);
            if (startDateConvert.after(endDateConvert)) {
                throw new ValidationException(ErrorMessage.DATE_INCORRECT);
            }

            StaffsDashboard staffsDashboard = staffDashboardService.getStaffsDashboard(startDateConvert, endDateConvert, stallId);
            return new ResponseEntity<>(staffsDashboard, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw new ApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage());
        }
    }
}
