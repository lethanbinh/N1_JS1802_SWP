package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.Regex;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.service.internal.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

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

        if (!userRequest.getPassword().matches(Regex.PASSWORD_PATTERN)) {
            errors.rejectValue("password", "error.password", ErrorMessage.PASSWORD_VALIDATION_FAILED);
        }

        if (!userRequest.getPhone().matches(Regex.PHONE_PATTERN)) {
            errors.rejectValue("phone", "error.phone", ErrorMessage.PHONE_VALIDATION_FAILED);
        }

        if (userRequest.getBirthday().after(new Date())) {
            errors.rejectValue("birthday", "error.birthday", ErrorMessage.BIRTHDAY_VALIDATION_FAILED);
        }

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
