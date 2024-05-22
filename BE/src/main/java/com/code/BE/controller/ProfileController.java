package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.model.dto.request.ProfileUpdateRoleUser;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.service.internal.userService.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@PreAuthorize(value = "hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (userService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody ProfileUpdateRoleUser profileUpdateRoleUser) throws Exception {
        try {
            if (userService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.updateByIdRoleUser(id, profileUpdateRoleUser));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
