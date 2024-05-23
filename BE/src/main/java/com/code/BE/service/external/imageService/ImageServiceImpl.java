package com.code.BE.service.external.imageService;

import com.code.BE.model.entity.ImageData;
import com.code.BE.repository.ImageRepository;
import com.code.BE.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ImageServiceImpl implements ImageService{

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageUtil imageUtil;

    @Override
    public ImageData uploadImage(MultipartFile file) throws IOException {
        ImageData dbImageData = imageRepository.findByName(file.getOriginalFilename());
        if (dbImageData != null) {
            imageRepository.deleteById(dbImageData.getId());
        }

        ImageData imageData = new ImageData();
        imageData.setName(file.getOriginalFilename());
        imageData.setType(file.getContentType());
        imageData.setImageData(imageUtil.compressImage(file.getBytes()));

        return imageRepository.saveAndFlush(imageData);
    }

    @Override
    public byte[] downloadImage(String fileName) throws IOException {
        ImageData dbImageData = imageRepository.findByName(fileName);
        return imageUtil.decompressImage(dbImageData.getImageData());
    }

    @Override
    public ImageData saveImage(BufferedImage bufferedImage, String fileName) throws IOException {
        ImageData dbImageData = imageRepository.findByName(fileName);
        if (dbImageData != null) {
            imageRepository.deleteById(dbImageData.getId());
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", byteArrayOutputStream);
        byte[] imageBytes = byteArrayOutputStream.toByteArray();

        ImageData imageData = new ImageData();
        imageData.setName(fileName);
        imageData.setType(MediaType.IMAGE_PNG.getType());
        imageData.setImageData(imageUtil.compressImage(imageBytes));
        return imageRepository.saveAndFlush(imageData);
    }
}
