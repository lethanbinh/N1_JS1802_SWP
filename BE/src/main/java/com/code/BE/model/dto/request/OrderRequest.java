package com.code.BE.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    @NotNull
    private String name;
    private String description;
    private String status;
    private String type;
    private String address;
    @PositiveOrZero
    private double tax;
    @PositiveOrZero
    private double totalBonusPoint;
    @PositiveOrZero
    private double customerGiveMoney;
    @PositiveOrZero
    private double refundMoney;

    private int promotionId;
    private int staffId;
    private int customerId;
}
