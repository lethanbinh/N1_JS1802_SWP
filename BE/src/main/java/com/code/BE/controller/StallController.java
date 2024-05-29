package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.service.internal.stallService.StallService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.StallValidator;
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
@RequestMapping("/api/v1/stalls")
@PreAuthorize(value = "hasAuthority('ROLE_MANAGER')")
public class StallController {
    @Autowired
    private StallService stallService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private StallValidator stallValidator;

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<StallResponse>>> findAll() throws Exception {
        ApiResponse<List<StallResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(stallService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<ApiResponse<List<StallResponse>>> findByNameContaining(@PathVariable String name) throws Exception {
        ApiResponse<List<StallResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(stallService.findByNameContaining(name));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<StallResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (stallService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.STALL_NOT_FOUND);
            }
            ApiResponse<StallResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(stallService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<StallResponse>> save(@Valid @RequestBody StallRequest stallRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<StallResponse> apiResponse = new ApiResponse<>();
        try {
            stallValidator.validate(stallRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            StallResponse stallResponse = stallService.save(stallRequest);
            apiResponse.ok(stallResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<StallResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody StallRequest stallRequest
            , BindingResult bindingResult) throws Exception {
        try {
            StallResponse stallResponse = stallService.findById(id);
            if (stallResponse == null) {
                throw new NotFoundException(ErrorMessage.STALL_NOT_FOUND);
            }

            if (!stallResponse.getCode().equals(stallRequest.getCode())) {
                stallValidator.validate(stallRequest, bindingResult);
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ApiResponse<StallResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(stallService.editById(id, stallRequest));
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
            StallResponse stallResponse = stallService.findById(id);
            if (stallResponse == null) {
                throw new NotFoundException(ErrorMessage.STALL_NOT_FOUND);
            }
            stallService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
