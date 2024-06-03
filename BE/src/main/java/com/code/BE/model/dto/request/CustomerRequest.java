package com.code.BE.model.dto.request;

import com.code.BE.constant.Regex;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    private String fullName;
    @Pattern(regexp = Regex.PHONE_PATTERN)
    private String phone;
    @Email
    private String email;
    private String address;
    private Date birthday;
    private boolean status;
}
