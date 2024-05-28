package com.code.BE.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    @NotNull
    private String name;

    private String image;

    private String description;

    @PositiveOrZero
    private double purchasePrice;

    @PositiveOrZero
    private double sellPrice;

    @PositiveOrZero
    private int quantity;

    private boolean status;

    @PositiveOrZero
    private double weight;

    private String size;

    private String stallLocation;

    private String type;

    private int stallId;
}
