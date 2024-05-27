package com.code.BE.model.dto.response;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {
    private int id;
    @NotNull
    private String productName;
    @PositiveOrZero
    private double productPrice;
    @PositiveOrZero
    private int productQuantity;
    @PositiveOrZero
    private double totalPrice;
    private int productId;
    private int orderId;
}
