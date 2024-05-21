package com.code.BE.constant;

public class Regex {
    // Define the regular expression for Vietnamese phone numbers
    public static final String PHONE_PATTERN = "^(\\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$";

    // Password must be: At least 6 characters, 1 uppercase letter, 1 number and 1 special character
    public static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";

}
