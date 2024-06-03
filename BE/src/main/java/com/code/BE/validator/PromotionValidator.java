package com.code.BE.validator;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.model.dto.request.PromotionRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class PromotionValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return PromotionRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PromotionRequest promotionRequest = (PromotionRequest) target;

        // Validate discount
        if (promotionRequest.getDiscount() < 0 || promotionRequest.getDiscount() > 1) {
            errors.rejectValue("discount", "error.discount", ErrorMessage.DISCOUNT_VALIDATION_FAILED);
        }

        // Validate name
        if (promotionRequest.getName() == null || promotionRequest.getName().isEmpty()) {
            errors.rejectValue("name", "error.name", ErrorMessage.NAME_VALIDATION_FAILED);
        }

        // Validate date range
        if (promotionRequest.getStartDate() != null && promotionRequest.getEndDate() != null) {
            if (promotionRequest.getStartDate().after(promotionRequest.getEndDate())) {
                errors.rejectValue("startDate", "error.startDate", ErrorMessage.START_DATE_VALIDATION_FAILED);
            }
        }

        // Validate prize range
        if (promotionRequest.getMinimumPrize() < 0) {
            errors.rejectValue("minimumPrize", "error.minimumPrize", ErrorMessage.MINIMUM_PRIZE_VALIDATION_FAILED);
        }

        if (promotionRequest.getMaximumPrize() < 0) {
            errors.rejectValue("maximumPrize", "error.maximumPrize", ErrorMessage.MAXIMUM_PRIZE_VALIDATION_FAILED);
        }

        if (promotionRequest.getMinimumPrize() > promotionRequest.getMaximumPrize()) {
            errors.rejectValue("minimumPrize", "error.minimumPrize", ErrorMessage.PRIZE_RANGE_VALIDATION_FAILED);
        }
    }
}
