package com.code.BE.service.external.barcodeService;

import java.awt.image.BufferedImage;

public interface BarcodeService {
    BufferedImage generateEAN13BarcodeImage(String barcodeText) throws Exception;
}
