package com.code.BE.model.dto.request;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.UniqueElements;

public class RoleRequest {
    @NotNull
    @UniqueElements
    private String name;
    private String description;
}
