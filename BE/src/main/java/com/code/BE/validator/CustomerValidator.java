package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.Regex;
import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.service.internal.customerService.CustomerService;
import com.code.BE.util.PhoneNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

@Component
public class CustomerValidator implements Validator {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PhoneNumberUtil phoneNumberUtil;

    @Override
    public boolean supports(Class<?> clazz) {
        return CustomerRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CustomerRequest customerRequest = (CustomerRequest) target;
        if (customerService.findByPhone(phoneNumberUtil.normalizePhoneNumber(customerRequest.getPhone())) != null) {
            errors.rejectValue("phone", "error.phone", ErrorMessage.PHONE_EXIST);
        }

        if (!customerRequest.getPhone().matches(Regex.PHONE_PATTERN)) {
            errors.rejectValue("phone", "error.phone", ErrorMessage.PHONE_VALIDATION_FAILED);
        }

        if (customerRequest.getBirthday().after(new Date())) {
            errors.rejectValue("birthday", "error.birthday", ErrorMessage.BIRTHDAY_VALIDATION_FAILED);
        }
    }
}
