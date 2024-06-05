package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PolicyResponse {
    private int id;
    private String name;
    private String detail;
    private String type;
}
