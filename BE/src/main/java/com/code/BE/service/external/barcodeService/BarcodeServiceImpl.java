package com.code.BE.service.external.barcodeService;

import com.code.BE.util.BarcodeEANUtil;
import org.krysalis.barcode4j.impl.upcean.EAN13Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class BarcodeServiceImpl implements BarcodeService{
    @Autowired
    private BarcodeEANUtil barcodeEANUtil;

    public BufferedImage generateEAN13BarcodeImage(String barcodeText) {
        EAN13Bean barcodeGenerator = new EAN13Bean();
        BitmapCanvasProvider canvas =
                new BitmapCanvasProvider(160, BufferedImage.TYPE_BYTE_BINARY, false, 0);

        barcodeGenerator.generateBarcode(canvas, barcodeText);
        return canvas.getBufferedImage();
    }

    @Override
    public String generateEAN13BarcodeText(String countryCode, String manufacturerCode, String productCode) {
        return barcodeEANUtil.generateEANCode(countryCode, manufacturerCode, productCode);
    }

}
