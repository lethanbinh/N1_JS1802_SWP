package com.code.BE.service.external.QRCodeService;

import io.nayuki.qrcodegen.QrCode;

import java.awt.image.BufferedImage;

public interface QRCodeService {
    BufferedImage generateQrcode(String barcodeText) throws Exception;
    BufferedImage toImage(QrCode qr, int scale, int border);
    BufferedImage toImage(QrCode qr, int scale, int border, int lightColor, int darkColor);
}
