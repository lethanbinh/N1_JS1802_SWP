package com.code.BE.util;

import org.springframework.stereotype.Component;

@Component
public class BarcodeEANUtil {
    public String generateEANCode(String countryCode, String manufacturerCode, String productCode) {
        if (productCode == null || productCode.length() != 5) {
            throw new IllegalArgumentException("Product code must be exactly 5 digits");
        }

        String eanWithoutCheckDigit = countryCode + manufacturerCode + productCode;
        int checkDigit = calculateCheckDigit(eanWithoutCheckDigit);
        return eanWithoutCheckDigit + checkDigit;
    }

    private static int calculateCheckDigit(String ean) {
        int sum = 0;
        for (int i = 0; i < ean.length(); i++) {
            int digit = Character.getNumericValue(ean.charAt(i));
            if (i % 2 == 0) {
                sum += digit;
            } else {
                sum += digit * 3;
            }
        }
        int mod = sum % 10;
        return mod == 0 ? 0 : 10 - mod;
    }
}
