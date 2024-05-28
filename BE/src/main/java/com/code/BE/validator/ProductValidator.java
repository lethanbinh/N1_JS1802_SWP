package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.service.internal.stallService.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ProductValidator implements Validator {

    @Autowired
    private StallService stallService;

    @Override
    public boolean supports(Class<?> clazz) {
        return ProductRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductRequest productRequest = (ProductRequest) target;
        if (stallService.findById(productRequest.getStallId()) == null) {
            errors.rejectValue("stallId", "error.stallId", ErrorMessage.STALL_NOT_FOUND);
        }
    }
}
