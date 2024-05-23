package com.code.BE.service.external.imageService;

import com.code.BE.model.entity.ImageData;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface ImageService {
    ImageData uploadImage (MultipartFile file) throws IOException;
    byte[] downloadImage (String fileName) throws IOException;
    ImageData saveImage (BufferedImage bufferedImage, String fileName) throws IOException;
}
