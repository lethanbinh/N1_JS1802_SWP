package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.service.internal.orderService.OrderService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.OrderDetailValidator;
import com.code.BE.validator.OrderValidator;
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
@RequestMapping("/api/v1/orders")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private OrderValidator orderValidator;

    @Autowired
    private OrderDetailValidator orderDetailValidator;

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> findAll() throws Exception {
        ApiResponse<List<OrderResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(orderService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (orderService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.ORDER_NOT_FOUND);
            }
            ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/staffName/{staffName}")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> findByStaffFullNameContaining(@PathVariable String staffName) throws Exception {
        try {
            ApiResponse<List<OrderResponse>> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderService.findByStaffFullNameContaining(staffName));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/customerName/{customerName}")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> findByCustomerFullNameContaining(@PathVariable String customerName) throws Exception {
        try {
            ApiResponse<List<OrderResponse>> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderService.findByCustomerFullNameContaining(customerName));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<OrderResponse>> save(@Valid @RequestBody OrderRequest orderRequest,
                                                             BindingResult bindingResult) throws Exception {
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        try {
            orderValidator.validate(orderRequest, bindingResult);
            for (OrderDetailRequest orderDetailRequest : orderRequest.getOrderDetailRequestList()) {
                orderDetailValidator.validate(orderDetailRequest, bindingResult);
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            OrderResponse orderResponse = orderService.save(orderRequest);
            apiResponse.ok(orderResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody OrderRequest orderRequest
            , BindingResult bindingResult) throws Exception {
        try {
            OrderResponse orderResponse = orderService.findById(id);
            if (orderResponse == null) {
                throw new NotFoundException(ErrorMessage.ORDER_NOT_FOUND);
            }

            orderValidator.validate(orderRequest, bindingResult);
            for (OrderDetailRequest orderDetailRequest : orderRequest.getOrderDetailRequestList()) {
                orderDetailValidator.validate(orderDetailRequest, bindingResult);
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(orderService.editById(id, orderRequest));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
