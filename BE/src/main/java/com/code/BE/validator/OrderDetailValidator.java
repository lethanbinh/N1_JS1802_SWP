package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.service.internal.orderService.OrderService;
import com.code.BE.service.internal.productService.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class OrderDetailValidator implements Validator {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Override
    public boolean supports(Class<?> clazz) {
        return OrderDetailRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderDetailRequest orderDetailRequest = (OrderDetailRequest) target;
        if (productService.findById(orderDetailRequest.getProductId()) == null) {
            errors.rejectValue("orderDetailRequestList", "error.orderDetailRequestList", ErrorMessage.PRODUCT_NOT_FOUND);
        }
    }
}
