package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.InvalidTokenException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.AuthRequest;
import com.code.BE.model.dto.request.ResetPasswordRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.AuthResponse;
import com.code.BE.service.internal.authService.AuthService;
import com.code.BE.service.internal.userService.UserService;
import com.code.BE.util.ValidatorUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest authRequest, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }
            AuthResponse authResponse = authService.login(authRequest);

            ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(authResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ValidationException(ErrorMessage.LOGIN_ERROR);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(String refreshToken) {
        try {
            AuthResponse authResponse = authService.refreshToken(refreshToken);

            ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(authResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new InvalidTokenException(ErrorMessage.REFRESH_TOKEN_ERROR);
        }
    }

    @GetMapping("/send-recover/{email}")
    public void sendRecoverEmail(@PathVariable String email) {
        try {
            if (userService.findByEmail(email) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }
            authService.sendRecoverEmail(email);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping("/check-token/{token}")
    public ResponseEntity<ApiResponse<String>> checkToken(@PathVariable String token) {
        try {
            ApiResponse<String> apiResponse = new ApiResponse<>();
            if (authService.isTokenExpire(token)) {
                throw new InvalidTokenException(ErrorMessage.CONFIRM_TOKEN_ERROR);
            }
            apiResponse.ok(SuccessMessage.CONFIRM_TOKEN_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (InvalidTokenException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        try {
            if (userService.findByEmail(resetPasswordRequest.getEmail()) == null) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
            }

            if (authService.isTokenExpire(resetPasswordRequest.getToken())) {
                throw new InvalidTokenException(ErrorMessage.CONFIRM_TOKEN_ERROR);
            }

            authService.resetPassword(resetPasswordRequest.getEmail(), resetPasswordRequest.getPassword(), resetPasswordRequest.getToken());
            ApiResponse<String> apiResponse = new ApiResponse<>();
            apiResponse.ok(SuccessMessage.RESET_PASSWORD_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
