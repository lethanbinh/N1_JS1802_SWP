package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {
    private int id;
    private String productName;
    private double productPrice;
    private int productQuantity;
    private double totalPrice;
    private int productId;
    private int orderId;
}
