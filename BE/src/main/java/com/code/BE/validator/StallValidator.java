package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.Regex;
import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.service.internal.stallService.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class StallValidator implements Validator {

    @Autowired
    private StallService stallService;

    @Override
    public boolean supports(Class<?> clazz) {
        return StallRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        StallRequest stallRequest = (StallRequest)target;

        StallResponse stallResponse = stallService.findByCode(stallRequest.getCode());

        if (stallResponse != null) {
            errors.rejectValue("code", "error.code", ErrorMessage.STALL_CODE_EXIST);
        }

        if (!stallRequest.getCode().matches(Regex.STALL_CODE_PATTERN)) {
            errors.rejectValue("code", "error.code", ErrorMessage.STALL_CODE_VALIDATION_FAILED);
        }
    }
}
