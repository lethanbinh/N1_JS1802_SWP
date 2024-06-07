package com.code.BE.model.dto.response;

import com.code.BE.model.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarrantyCardResponse {
    private int id;
    private String name;
    private Date startDate;
    private Date endDate;
    private int orderId;
}
