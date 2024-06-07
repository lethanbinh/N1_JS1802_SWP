package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.WarrantyCardResponse;
import com.code.BE.service.internal.warrantyCardService.WarrantyCardService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.WarrantyCardValidator;
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
@RequestMapping("/api/v1/warranty-cards")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class WarrantyCardController {
    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private WarrantyCardValidator warrantyCardValidator;

    @Autowired
    private WarrantyCardService warrantyCardService;


    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<WarrantyCardResponse>>> findAll() throws Exception {
        ApiResponse<List<WarrantyCardResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(warrantyCardService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<WarrantyCardResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (warrantyCardService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.WARRANTY_NOT_FOUND);
            }
            ApiResponse<WarrantyCardResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(warrantyCardService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
        public ResponseEntity<ApiResponse<WarrantyCardResponse>> save(@Valid @RequestBody WarrantyCardRequest warrantyCardRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<WarrantyCardResponse> apiResponse = new ApiResponse<>();
        try {
            warrantyCardValidator.validate(warrantyCardRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            WarrantyCardResponse warrantyCardResponse = warrantyCardService.save(warrantyCardRequest);
            apiResponse.ok(warrantyCardResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping("/id/{id}")
        public ResponseEntity<ApiResponse<WarrantyCardResponse>> editById(@PathVariable int id, @Valid @RequestBody WarrantyCardRequest warrantyCardRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<WarrantyCardResponse> apiResponse = new ApiResponse<>();
        try {
            if(warrantyCardService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.WARRANTY_NOT_FOUND);
            }
            warrantyCardValidator.validate(warrantyCardRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            WarrantyCardResponse warrantyCardResponse = warrantyCardService.editById(id, warrantyCardRequest);
            apiResponse.ok(warrantyCardResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteById(@PathVariable int id) throws Exception {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        try {
            WarrantyCardResponse WarrantyCardResponse = warrantyCardService.findById(id);
            if (WarrantyCardResponse == null) {
                throw new NotFoundException(ErrorMessage.WARRANTY_NOT_FOUND);
            }
            warrantyCardService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
