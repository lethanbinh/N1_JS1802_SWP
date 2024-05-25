package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.service.internal.orderService.OrderDetailService;
import com.code.BE.util.ValidatorUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/order-details")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<OrderDetailResponse>>> findAll() throws Exception {
        ApiResponse<List<OrderDetailResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(orderDetailService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (orderDetailService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.ORDER_DETAIL_NOT_FOUND);
            }
            ApiResponse<OrderDetailResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderDetailService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> save(@Valid @RequestBody OrderDetailRequest orderDetailRequest,
                                                           BindingResult bindingResult) throws Exception {
        ApiResponse<OrderDetailResponse> apiResponse = new ApiResponse<>();
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            OrderDetailResponse orderDetailResponse = orderDetailService.save(orderDetailRequest);
            apiResponse.ok(orderDetailResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody OrderDetailRequest orderDetailRequest
            , BindingResult bindingResult) throws Exception {
        try {
            OrderDetailResponse orderDetailResponse = orderDetailService.findById(id);
            if (orderDetailResponse == null) {
                throw new NotFoundException(ErrorMessage.ORDER_DETAIL_NOT_FOUND);
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ApiResponse<OrderDetailResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderDetailService.editById(id, orderDetailRequest));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteById(@PathVariable int id) throws Exception {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        try {
            OrderDetailResponse orderDetailResponse = orderDetailService.findById(id);
            if (orderDetailResponse == null) {
                throw new NotFoundException(ErrorMessage.ORDER_DETAIL_NOT_FOUND);
            }
            orderDetailService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
