package com.code.BE.util;

import org.springframework.stereotype.Component;

@Component
public class PhoneNumberUtil {

    public String normalizePhoneNumber(String phone) {
        if (phone.startsWith("+84")) {
            return phone.replaceFirst("\\+84", "0");
        }
        return phone;
    }
}