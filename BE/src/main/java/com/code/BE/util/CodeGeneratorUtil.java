package com.code.BE.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CodeGeneratorUtil {
    private final Random RANDOM = new Random();

    public String generateRandomManufacturerCode() {
        // Generate a 5-digit random number
        int manufacturerCode = RANDOM.nextInt(9000) + 1000;
        return String.format("%04d", manufacturerCode);
    }

    public String generateRandomProductCode() {
        // Generate a 5-digit random number
        int productCode = RANDOM.nextInt(90000) + 10000;
        return String.format("%05d", productCode);
    }
}
