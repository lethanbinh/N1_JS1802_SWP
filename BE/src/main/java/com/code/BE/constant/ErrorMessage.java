package com.code.BE.constant;

public class ErrorMessage {
    // authenticate and authorize
    public static final String LOGIN_ERROR = "Username or password error";
    public static final String REFRESH_TOKEN_ERROR = "Refresh token is invalid or expired";
    public static final String USER_NOT_FOUND = "User not found";
    public static final String STALL_NOT_FOUND = "Stall not found";
    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String CUSTOMER_NOT_FOUND = "Customer not found";
    public static final String STAFF_NOT_FOUND = "Staff not found";
    public static final String ROLE_NOT_FOUND = "Role not found";
    public static final String PROMOTION_NOT_FOUND = "Promotion not found";

    public static final String DISCOUNT_VALIDATION_FAILED = "Discount must be zero or positive.";
    public static final String NAME_VALIDATION_FAILED = "Name cannot be empty.";
    public static final String START_DATE_VALIDATION_FAILED = "Start date cannot be after end date.";
    public static final String MINIMUM_PRIZE_VALIDATION_FAILED = "Minimum prize must be zero or positive.";
    public static final String MAXIMUM_PRIZE_VALIDATION_FAILED = "Maximum prize must be zero or positive.";
    public static final String PRIZE_RANGE_VALIDATION_FAILED = "Minimum prize cannot be greater than maximum prize.";

    public static final String TYPE_VALIDATION_FAILED = "Type cannot be empty.";
    public static final String ORDER_NOT_FOUND = "Order not found";
    public static final String CONFIRM_TOKEN_ERROR = "Confirm token is invalid or expired";
    public static final String WARRANTY_NOT_FOUND = "warranty not found";

    // validation
    public static final String USERNAME_EXIST = "Username exists";
    public static final String EMAIL_EXIST = "Email exists";
    public static final String STALL_CODE_EXIST = "Stall code exists";
    public static final String ROLE_EXIST = "Role exists";
    public static final String PHONE_EXIST = "Phone exists";

    public static final String STALL_CODE_VALIDATION_FAILED = "Stall code must be exactly 6 characters long, starting with \"ST\", followed by exactly 4 digits";
    public static final String TAX_VALIDATION_FAILED = "Tax must be value from 0 to 1";
    public static final String PASSWORD_VALIDATION_FAILED = "Password must meet the following criteria: at least 6 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.";
    public static final String PHONE_VALIDATION_FAILED = "Incorrect Vietnam Phone";

    public static final String DATE_VALIDATION_FAILED = "Date is not correct format";
    public static final String DATE_INCORRECT = "Start date cannot after end date";
    public static final String BIRTHDAY_VALIDATION_FAILED = "Birthday cannot be a day in future";

    public static final String PROMOTION_EXPIRED = "Promotion expired";
    public static final String POLICY_NOT_FOUND = "Policy not found";


    public static final String START_DATE_WARRANTY_VALIDATION_FAILED = "Start date cannot be null.";
    public static final String END_DATE_WARRANTY_VALIDATION_FAILED = "End date cannot be null.";
    public static final String DATE_RANGE_VALIDATION_FAILED = "Start date must be before or equal to end date.";
    public static final String ORDER_WARRANTY_VALIDATION_FAILED = "Order warranty cannot be null.";
}
