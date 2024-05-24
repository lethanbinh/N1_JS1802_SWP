package com.code.BE.service.external.barcodeService;

import com.code.BE.model.entity.Product;

import java.awt.image.BufferedImage;

public interface BarcodeService {
    BufferedImage generateEAN13BarcodeImage(String barcodeText) throws Exception;
    String generateEAN13BarcodeText (String countryCode, String manufacturerCode, String productCode);
}
