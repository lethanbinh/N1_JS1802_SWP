package com.code.BE.model.dto.request;

import com.code.BE.constant.Regex;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRoleUser {
    @NotNull
    private String username;
    @Pattern(regexp = Regex.PHONE_PATTERN)
    private String phone;
    @Email
    private String email;
    private String address;
    private String avatar;
    private Date birthday;
}
