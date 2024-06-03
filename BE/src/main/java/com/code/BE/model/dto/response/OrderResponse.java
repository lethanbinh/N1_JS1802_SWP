package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private int id;
    private String description;
    private String status;
    private String type;
    private Date createDate;
    private String address;
    private double totalPrice;
    private double tax;
    private double finalPrice;
    private double totalBonusPoint;
    private double customerGiveMoney;
    private double refundMoney;
    private int promotionId;
    private int staffId;

    private CustomerResponse customerResponse;
    private List<OrderDetailResponse> orderDetailResponses;
}
