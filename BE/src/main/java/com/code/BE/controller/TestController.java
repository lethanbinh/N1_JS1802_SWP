package com.code.BE.controller;

import com.code.BE.model.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class TestController {

    @GetMapping(value = "/all")
    public ResponseEntity<ApiResponse<String>> getAllUsers() {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.ok("Hello world");
        return ResponseEntity.ok(apiResponse);
    }
}
