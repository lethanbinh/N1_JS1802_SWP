package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StallResponse {
    private int id;
    private String code;
    private String name;
    private String type;
    private String description;
    private double revenue;
    private boolean status;
    private int staffId;
}
