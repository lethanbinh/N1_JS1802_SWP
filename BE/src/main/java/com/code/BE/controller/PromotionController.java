package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.service.internal.promotionService.PromotionService;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.PromotionResponse;

import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.ProductValidator;
import com.code.BE.validator.PromotionValidator;
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
@RequestMapping("/api/v1/promotions")
@PreAuthorize(value = "hasAuthority('ROLE_MANAGER')")
public class PromotionController {
    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private PromotionValidator promotionValidator;

    @Autowired
    private PromotionService promotionService;

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<PromotionResponse>>> findAll() throws Exception {
        ApiResponse<List<PromotionResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(promotionService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<PromotionResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (promotionService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.PROMOTION_NOT_FOUND);
            }
            ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(promotionService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<PromotionResponse>> save(@Valid @RequestBody PromotionRequest promotionRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
        try {
            promotionValidator.validate(promotionRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            PromotionResponse PromotionResponse = promotionService.save(promotionRequest);
            apiResponse.ok(PromotionResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<ApiResponse<PromotionResponse>> editById(@PathVariable int id, @Valid @RequestBody PromotionRequest promotionRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
        try {
            if(promotionService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.PROMOTION_NOT_FOUND);
            }
            promotionValidator.validate(promotionRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            PromotionResponse PromotionResponse = promotionService.editById(id, promotionRequest);
            apiResponse.ok(PromotionResponse);
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
            PromotionResponse promotionResponse = promotionService.findById(id);
            if (promotionResponse == null) {
                throw new NotFoundException(ErrorMessage.PROMOTION_NOT_FOUND);
            }
            promotionService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }


}