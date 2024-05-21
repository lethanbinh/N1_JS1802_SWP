package com.code.BE.service.external.imageService;

import com.code.BE.model.entity.ImageData;
import com.code.BE.repository.ImageRepository;
import com.code.BE.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
}
