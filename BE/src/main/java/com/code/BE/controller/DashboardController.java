package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.entity.OrderStatistics;
import com.code.BE.model.entity.ProductStatistics;
import com.code.BE.model.entity.RevenueStatistics;
import com.code.BE.model.entity.StaffStatistics;
import com.code.BE.service.external.dateService.DateConvertService;
import com.code.BE.service.internal.dashboardService.DashboardService;
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
@RequestMapping("/api/v1/dashboard")
@PreAuthorize(value = "hasAuthority('ROLE_MANAGER')")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DateConvertService dateConvertService;

    @GetMapping(value = "/revenue-statistics/{startDate}/{endDate}/{previousStartDate}/{previousEndDate}")
    public ResponseEntity<ApiResponse<RevenueStatistics>> getRevenueStatistics(
            @PathVariable String startDate,
            @PathVariable String endDate,
            @PathVariable String previousStartDate,
            @PathVariable String previousEndDate
    ) {
        ApiResponse<RevenueStatistics> apiResponse = new ApiResponse<>();
        try {
            Date startDateConvert = dateConvertService.convertToDate(startDate);
            Date endDateConvert = dateConvertService.convertToDate(endDate);
            Date previousStartDateConvert = dateConvertService.convertToDate(previousStartDate);
            Date previousEndDateConvert = dateConvertService.convertToDate(previousEndDate);
            if (startDateConvert.after(endDateConvert) || previousStartDateConvert.after(previousEndDateConvert)) {
                throw new ValidationException(ErrorMessage.DATE_INCORRECT);
            }

            apiResponse.ok(dashboardService.getRevenueStatistics(
                    startDateConvert,
                    endDateConvert,
                    previousStartDateConvert,
                    previousEndDateConvert));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/order-statistics/{startDate}/{endDate}")
    public ResponseEntity<ApiResponse<OrderStatistics>> getOrderStatistics(@PathVariable String startDate, @PathVariable String endDate) {
        ApiResponse<OrderStatistics> apiResponse = new ApiResponse<>();
        try {
            Date startDateConvert = dateConvertService.convertToDate(startDate);
            Date endDateConvert = dateConvertService.convertToDate(endDate);
            if (startDateConvert.after(endDateConvert)) {
                throw new ValidationException(ErrorMessage.DATE_INCORRECT);
            }

            apiResponse.ok(dashboardService.getOrderStatistics(dateConvertService.convertToDate(startDate),
                    dateConvertService.convertToDate(endDate)));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/product-statistics/{startDate}/{endDate}")
    public ResponseEntity<ApiResponse<ProductStatistics>> getProductStatistics(@PathVariable String startDate, @PathVariable String endDate) {
        ApiResponse<ProductStatistics> apiResponse = new ApiResponse<>();
        try {
            Date startDateConvert = dateConvertService.convertToDate(startDate);
            Date endDateConvert = dateConvertService.convertToDate(endDate);
            if (startDateConvert.after(endDateConvert)) {
                throw new ValidationException(ErrorMessage.DATE_INCORRECT);
            }

            apiResponse.ok(dashboardService.getProductStatistics(dateConvertService.convertToDate(startDate),
                    dateConvertService.convertToDate(endDate)));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/staff-statistics/{startDate}/{endDate}")
    public ResponseEntity<ApiResponse<StaffStatistics>> getStaffStatistics(@PathVariable String startDate, @PathVariable String endDate) {
        ApiResponse<StaffStatistics> apiResponse = new ApiResponse<>();
        try {
            Date startDateConvert = dateConvertService.convertToDate(startDate);
            Date endDateConvert = dateConvertService.convertToDate(endDate);
            if (startDateConvert.after(endDateConvert)) {
                throw new ValidationException(ErrorMessage.DATE_INCORRECT);
            }

            apiResponse.ok(dashboardService.getStaffStatistics(dateConvertService.convertToDate(startDate),
                    dateConvertService.convertToDate(endDate)));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
