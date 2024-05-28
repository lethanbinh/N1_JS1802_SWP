package com.code.BE.model.dto.request;

import com.code.BE.constant.Regex;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    @NotNull
    private String username;
    private String fullName;

    @NotNull
    @Pattern(regexp = Regex.PASSWORD_PATTERN)
    private String password;

    @Pattern(regexp = Regex.PHONE_PATTERN)
    private String phone;

    @Email
    private String email;
    private String address;
    private String avatar;
    private Date birthday;
    private boolean status;

    @Positive
    private int roleId;
}
