package com.code.BE.validator;

import com.code.BE.constant.Enums;
import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.service.internal.orderService.OrderService;
import com.code.BE.service.internal.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;

@Component
public class OrderValidator implements Validator {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        return OrderRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderRequest orderRequest = (OrderRequest) target;

        if (userService.findById(orderRequest.getCustomerId()) == null) {
            errors.rejectValue("customerId", "error.customerId", ErrorMessage.CUSTOMER_NOT_FOUND);
        }

        if (userService.findById(orderRequest.getStaffId()) == null) {
            errors.rejectValue("staffId", "error.staffId", ErrorMessage.STAFF_NOT_FOUND);
        }

        try {
            Enums.OrderStatus.valueOf(orderRequest.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid order status: " + orderRequest.getStatus() + ". Valid statuses are: " +
                    Arrays.toString(Enums.OrderStatus.values()));
        }

        try {
            Enums.OrderType.valueOf(orderRequest.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid order types: " + orderRequest.getType() + ". Valid types are: " +
                    Arrays.toString(Enums.OrderType.values()));
        }
    }
}
