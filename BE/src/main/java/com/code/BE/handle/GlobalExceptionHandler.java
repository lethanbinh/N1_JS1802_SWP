package com.code.BE.handle;

import com.code.BE.exception.NotFoundException;
import com.code.BE.model.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ApiResponse handleException(Exception ex) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(ex.getMessage());
        return apiResponse;
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    public ApiResponse handleNotFoundException(NotFoundException ex) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(ex.getMessage());
        return apiResponse;
    }

}

