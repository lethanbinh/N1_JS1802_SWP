package com.code.BE.controller;


import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.RoleResponse;
import com.code.BE.service.internal.roleService.RoleService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.RoleValidator;
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
@RequestMapping("/api/v1/roles")
@PreAuthorize(value = "hasAuthority('ROLE_ADMIN')")
public class RoleController {
    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private RoleService roleService;

    @Autowired
    private RoleValidator roleValidator;

    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<RoleResponse>>> findAll() throws Exception {
        ApiResponse<List<RoleResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(roleService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (roleService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.ROLE_NOT_FOUND);
            }
            ApiResponse<RoleResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(roleService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<RoleResponse>> save(@Valid @RequestBody RoleRequest roleRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<RoleResponse> apiResponse = new ApiResponse<>();
        try {
            if (roleService.findByName(roleRequest.getName()) != null) {
                throw new ValidationException(ErrorMessage.ROLE_EXIST);
            }

            roleValidator.validate(roleRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            RoleResponse roleResponse = roleService.save(roleRequest);
            apiResponse.ok(roleResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody RoleRequest roleRequest
            , BindingResult bindingResult) throws Exception {
        try {
            if (roleService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.ROLE_NOT_FOUND);
            }

            roleValidator.validate(roleRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }
            ApiResponse<RoleResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(roleService.editById(id, roleRequest));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

}
