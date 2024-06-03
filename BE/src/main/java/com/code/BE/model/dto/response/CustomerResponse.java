package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private int id;
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private Date createDate;
    private Date updateDate;
    private Date birthday;
    private boolean status;
}
