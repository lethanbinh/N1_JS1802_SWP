package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.CustomerResponse;
import com.code.BE.service.internal.customerService.CustomerService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.CustomerValidator;
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
@RequestMapping("/api/v1/customers")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private CustomerValidator customerValidator;

    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<CustomerResponse>>> findAll() throws Exception {
        ApiResponse<List<CustomerResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(customerService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/customerName/{customerName}")
    public ResponseEntity<ApiResponse<List<CustomerResponse>>> findByFullNameContaining(@PathVariable String customerName) throws Exception {
        ApiResponse<List<CustomerResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(customerService.findByFullNameContaining(customerName));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<CustomerResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (customerService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND);
            }
            ApiResponse<CustomerResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(customerService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/phone/{phone}")
    public ResponseEntity<ApiResponse<CustomerResponse>> findByPhone(@PathVariable String phone) throws Exception {
        try {
            if (customerService.findByPhone(phone) == null) {
                throw new NotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND);
            }
            ApiResponse<CustomerResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(customerService.findByPhone(phone));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<CustomerResponse>> save(@Valid @RequestBody CustomerRequest customerRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<CustomerResponse> apiResponse = new ApiResponse<>();
        try {
            customerValidator.validate(customerRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            CustomerResponse customerResponse = customerService.save(customerRequest);
            apiResponse.ok(customerResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<CustomerResponse>> editById(@PathVariable int id
            , @Valid @RequestBody CustomerRequest customerRequest
            , BindingResult bindingResult) throws Exception {
        try {
            CustomerResponse customerResponse = customerService.findById(id);
            if (customerResponse == null) {
                throw new NotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND);
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ApiResponse<CustomerResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(customerService.editById(id, customerRequest));
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
            CustomerResponse customerResponse = customerService.findById(id);
            if (customerResponse == null) {
                throw new NotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND);
            }
            customerService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
