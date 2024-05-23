package com.code.BE.model.dto.response;

import com.code.BE.model.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private int id;
    private String username;
    private Date registerDate;
    private String phone;
    private String email;
    private String address;
    private String avatar;
    private double pointBonus;
    private Date birthday;
    private boolean status;
    private String roleId;
    private String stallId;
}
