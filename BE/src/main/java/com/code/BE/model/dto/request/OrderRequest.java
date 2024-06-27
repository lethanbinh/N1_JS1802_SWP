package com.code.BE.model.dto.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String description;
    private String status;
    private String type;
    private String address;

    @PositiveOrZero
    private double totalPrice = 0;

    @PositiveOrZero
    private double tax = 0;

    @PositiveOrZero
    private double totalBonusPoint = 0;

    @PositiveOrZero
    private double customerGiveMoney = 0;

    @PositiveOrZero
    private double refundMoney = 0;

    private String sendMoneyMethod;

    @PositiveOrZero
    private int promotionId;
    @PositiveOrZero
    private int staffId;

    private CustomerRequest customerRequest;
    private List<OrderDetailRequest> orderDetailRequestList;
}
