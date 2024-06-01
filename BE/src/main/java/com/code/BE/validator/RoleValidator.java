package com.code.BE.validator;

import com.code.BE.constant.Enums;
import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.service.internal.roleService.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;

@Component
public class RoleValidator implements Validator {

    @Autowired
    private RoleService roleService;

    @Override
    public boolean supports(Class<?> clazz) {
        return RoleRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RoleRequest roleRequest = (RoleRequest)target;

        try {
            Enums.Role.valueOf(roleRequest.getName().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role name: " + roleRequest.getName() + ". Valid role names are: " +
                    Arrays.toString(Enums.Role.values()));
        }
    }
}
