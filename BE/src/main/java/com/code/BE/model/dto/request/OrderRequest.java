package com.code.BE.model.dto.request;

import jakarta.validation.constraints.Positive;
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
    private double tax;
    @PositiveOrZero
    private double customerGiveMoney;
    @PositiveOrZero
    private int promotionId;
    @Positive
    private int staffId;

    private CustomerRequest customerRequest;
    private List<OrderDetailRequest> orderDetailRequestList;
}
