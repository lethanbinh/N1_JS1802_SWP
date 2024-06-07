package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.service.internal.orderService.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class WarrantyCardValidator implements Validator {

    @Autowired
    private OrderService orderService;

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        WarrantyCardRequest warrantyCardRequest = (WarrantyCardRequest) target;

        // Validate name is not null or empty
        if (warrantyCardRequest.getName() == null || warrantyCardRequest.getName().isEmpty()) {
            errors.rejectValue("name", "error.name", ErrorMessage.NAME_VALIDATION_FAILED);
        }

        // Validate startDate is not null
        if (warrantyCardRequest.getStartDate() == null) {
            errors.rejectValue("startDate", "error.startDate", ErrorMessage.START_DATE_WARRANTY_VALIDATION_FAILED);
        }

        // Validate endDate is not null
        if (warrantyCardRequest.getEndDate() == null) {
            errors.rejectValue("endDate", "error.endDate", ErrorMessage.END_DATE_WARRANTY_VALIDATION_FAILED);
        }

        // Validate startDate is before or equal to endDate
        if (warrantyCardRequest.getStartDate() != null && warrantyCardRequest.getEndDate() != null &&
                warrantyCardRequest.getStartDate().after(warrantyCardRequest.getEndDate())) {
            errors.rejectValue("endDate", "error.endDate", ErrorMessage.DATE_RANGE_VALIDATION_FAILED);
        }

        // Validate orderWarranty is not null
        if (orderService.findById(warrantyCardRequest.getOrderId()) == null) {
            errors.rejectValue("orderWarranty", "error.orderWarranty", ErrorMessage.ORDER_WARRANTY_VALIDATION_FAILED);
        }

        // Additional custom validations can be added here as required
    }
}

