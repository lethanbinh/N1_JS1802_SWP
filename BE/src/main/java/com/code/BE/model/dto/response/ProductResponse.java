package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private int id;
    private String name;
    private String image;
    private String description;
    private double purchasePrice;
    private double sellPrice;
    private int quantity;
    private boolean status;
    private double weight;
    private String size;
    private String stallLocation;
    private String type;
    private String code;
    private String barCode;
    private String barCodeText;
    private String qrCode;
    private int stallId;
}
