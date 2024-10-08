package com.code.BE.constant;

public class Regex {
    public static final String PHONE_PATTERN = "^(\\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$";
    public static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{6,}$";
    public static final String STALL_CODE_PATTERN = "^ST\\d{4}$";
    public static final String PRODUCT_CODE_PATTERN = "^\\d{5}$";
}
