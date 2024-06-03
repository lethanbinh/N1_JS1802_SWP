package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionResponse {
    //Ko add req vao id
    private int id;
    private double discount;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private double minimumPrize;
    private double maximumPrize;

}