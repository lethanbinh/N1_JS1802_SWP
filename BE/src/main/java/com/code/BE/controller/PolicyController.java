package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.PolicyResponse;
import com.code.BE.service.internal.policyService.PolicyService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.PolicyValidator;
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
@RequestMapping("/api/v1/polices")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class PolicyController {

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private PolicyValidator policyValidator;

    @Autowired
    private PolicyService policyService;

    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<PolicyResponse>>> findAll() throws Exception {
        ApiResponse<List<PolicyResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(policyService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<PolicyResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (policyService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.POLICY_NOT_FOUND);
            }
            ApiResponse<PolicyResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(policyService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<PolicyResponse>> save(@Valid @RequestBody PolicyRequest policyRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<PolicyResponse> apiResponse = new ApiResponse<>();
        try {
            policyValidator.validate(policyRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            PolicyResponse PolicyResponse = policyService.save(policyRequest);
            apiResponse.ok(PolicyResponse);
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
            PolicyResponse policyReponse = policyService.findById(id);
            if (policyReponse == null) {
                throw new NotFoundException(ErrorMessage.POLICY_NOT_FOUND);
            }
            policyService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
