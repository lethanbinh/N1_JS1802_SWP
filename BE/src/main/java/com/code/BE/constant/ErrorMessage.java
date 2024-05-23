package com.code.BE.constant;

public class ErrorMessage {
    // authenticate and authorize
    public static final String LOGIN_ERROR = "Username or password error";
    public static final String REFRESH_TOKEN_ERROR = "Refresh token is invalid or expired";
    public static final String USER_NOT_FOUND = "User not found";
    public static final String STALL_NOT_FOUND = "Stall not found";
    public static final String CONFIRM_TOKEN_ERROR = "Confirm token is invalid or expired";

    // validation
    public static final String USERNAME_EXIST = "Username exists";
    public static final String EMAIL_EXIST = "Email exists";
    public static final String STALL_CODE_EXIST = "Stall code exists";
    public static final String STALL_CODE_VALIDATION_FAILED = "Stall code must be exactly 6 characters long, starting with \"ST\", followed by exactly 4 digits";

}
