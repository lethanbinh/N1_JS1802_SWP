package com.code.BE.model.dto.request;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailRequest {
    @Positive
    private int productQuantity;
    @Positive
    private int productId;
}
