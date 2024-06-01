package com.code.BE.model.dto.request;

import com.code.BE.constant.ErrorMessage;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequest {
    @NotNull
    private String name;
    private String description;
}
