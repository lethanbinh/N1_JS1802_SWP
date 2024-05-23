package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.service.internal.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Autowired
    private UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        return UserRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserRequest userRequest = (UserRequest)target;

        UserResponse userNameUserValidation = userService.findByUsername(userRequest.getUsername());
        if (userNameUserValidation != null) {
            errors.rejectValue("username", "error.username", ErrorMessage.USERNAME_EXIST);
        }

        UserResponse emailNameUserValidation = userService.findByEmail(userRequest.getEmail());
        if (emailNameUserValidation != null) {
            errors.rejectValue("email", "error.email", ErrorMessage.EMAIL_EXIST);
        }
    }
}
