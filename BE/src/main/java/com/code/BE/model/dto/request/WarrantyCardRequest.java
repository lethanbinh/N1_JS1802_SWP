package com.code.BE.model.dto.request;

import com.code.BE.model.entity.Order;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarrantyCardRequest {
    @NotNull
    private String name;
    private Date startDate;
    private Date endDate;
    private int orderId;
}
