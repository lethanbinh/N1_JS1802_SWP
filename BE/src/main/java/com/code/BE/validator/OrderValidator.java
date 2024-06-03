package com.code.BE.validator;

import com.code.BE.constant.Enums;
import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.service.internal.customerService.CustomerService;
import com.code.BE.service.internal.orderService.OrderService;
import com.code.BE.service.internal.promotionService.PromotionService;
import com.code.BE.service.internal.roleService.RoleService;
import com.code.BE.service.internal.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;
import java.util.Date;

@Component
public class OrderValidator implements Validator {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PromotionService promotionService;

    @Override
    public boolean supports(Class<?> clazz) {
        return OrderRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderRequest orderRequest = (OrderRequest) target;
        int roleId = userService.findById(orderRequest.getStaffId()).getRoleId();

        if (userService.findById(orderRequest.getStaffId()) == null || !roleService.findById(roleId).getName().equalsIgnoreCase("STAFF")) {
            errors.rejectValue("staffId", "error.staffId", ErrorMessage.STAFF_NOT_FOUND);
        }

        if (promotionService.findById(orderRequest.getPromotionId()) == null) {
            errors.rejectValue("promotionId", "error.promotionId", ErrorMessage.PROMOTION_NOT_FOUND);
        }

        if (promotionService.findById(orderRequest.getPromotionId()).getEndDate().before(new Date())) {
            errors.rejectValue("promotionId", "error.promotionId", ErrorMessage.PROMOTION_EXPIRED);
        }

        if (orderRequest.getTax() < 0 || orderRequest.getTax() > 1) {
            errors.rejectValue("tax", "error.tax", ErrorMessage.TAX_VALIDATION_FAILED);
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
