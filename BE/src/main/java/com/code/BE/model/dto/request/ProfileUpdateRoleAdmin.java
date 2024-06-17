package com.code.BE.model.dto.request;

import com.code.BE.constant.Regex;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRoleAdmin {
    @NotNull
    private String username;
    @Pattern(regexp = Regex.PHONE_PATTERN)
    private String phone;

    @Email
    private String email;
    private String address;
    private String avatar;

    @PositiveOrZero
    private double pointBonus;
    private Date birthday;

    private boolean status;

    @Positive
    private int roleId;

    private int stallId;
}
