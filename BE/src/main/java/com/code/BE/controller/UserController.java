package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.ProfileUpdateRoleAdmin;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.service.internal.userService.UserService;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.UserValidator;
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
@RequestMapping("/api/v1/users")
@PreAuthorize(value = "hasAuthority('ROLE_ADMIN')")
public class UserController {
    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<UserResponse>>> findAll() throws Exception {
        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(userService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

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

    @GetMapping(value = "/username/{username}")
    public ResponseEntity<ApiResponse<UserResponse>> findByUsername(@PathVariable String username) throws Exception {
        try {
            if (userService.findByUsername(username) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.findByUsername(username));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity<ApiResponse<UserResponse>> findByEmail(@PathVariable String email) throws Exception {
        try {
            if (userService.findByEmail(email) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.findByEmail(email));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping(value = "/roleName/{roleName}")
    public ResponseEntity<ApiResponse<List<UserResponse>>> findByRoleName(@PathVariable String roleName) throws Exception {
        try {
            ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.findByRoleName(roleName));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<UserResponse>> save(@Valid @RequestBody UserRequest userRequest, BindingResult bindingResult) throws Exception {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        try {
            userValidator.validate(userRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            UserResponse userResponse = userService.save(userRequest);
            apiResponse.ok(userResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("/all")
    public ResponseEntity<ApiResponse<List<UserResponse>>> saveAll(@Valid @RequestBody List<UserRequest> userRequests, BindingResult bindingResult) throws Exception {
        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();
        try {
            for (UserRequest user : userRequests) {
                userValidator.validate(user, bindingResult);
            }
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            List<UserResponse> userResponse = userService.saveAll(userRequests);
            apiResponse.ok(userResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody ProfileUpdateRoleAdmin profileUpdateRoleAdmin
            , BindingResult bindingResult) throws Exception {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            if (userService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(userService.updateByIdRoleAdmin(id, profileUpdateRoleAdmin));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteById(@PathVariable int id) throws Exception {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        try {
            UserResponse userResponse = userService.findById(id);
            if (userResponse == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            userService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
