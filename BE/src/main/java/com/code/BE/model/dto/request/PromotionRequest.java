package com.code.BE.model.dto.request;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequest {
    //Ko add req vao id
    @PositiveOrZero
    private double discount;

    @NotNull
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;

    @PositiveOrZero
    private double minimumPrize;

    @PositiveOrZero
    private double maximumPrize;

}