package com.code.BE.validator;

import com.code.BE.constant.Enums;
import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.PolicyRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;

@Component
public class PolicyValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return PolicyRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PolicyRequest policyRequest = (PolicyRequest) target;

        // Validate name
        if (policyRequest.getName() == null || policyRequest.getName().isEmpty()) {
            errors.rejectValue("name", "error.name", ErrorMessage.NAME_VALIDATION_FAILED);
        }

        // Validate type
        if (policyRequest.getType() == null || policyRequest.getType().isEmpty()) {
            errors.rejectValue("type", "error.type", ErrorMessage.TYPE_VALIDATION_FAILED);
        }

        try {
            Enums.PolicyType.valueOf(policyRequest.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid policy type: " + policyRequest.getType() + ". Valid policies are: " +
                    Arrays.toString(Enums.PolicyType.values()));
        }
    }
}

