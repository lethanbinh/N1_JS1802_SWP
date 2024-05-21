package com.code.BE.controller;

import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.entity.ImageData;
import com.code.BE.service.external.imageService.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ImageData>> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        ImageData imageData = imageService.uploadImage(file);
        ApiResponse<ImageData> apiResponse = new ApiResponse<>();
        apiResponse.ok(imageData);
        return new ResponseEntity<ApiResponse<ImageData>>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) throws IOException {
        byte[] imageData = imageService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
