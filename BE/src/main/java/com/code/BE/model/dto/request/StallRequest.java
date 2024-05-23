package com.code.BE.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StallRequest {
    @NotNull
    private String code;
    @NotNull
    private String name;
    private String type;
    private String description;
    private boolean status;
}
