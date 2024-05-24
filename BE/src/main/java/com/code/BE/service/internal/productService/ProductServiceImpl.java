package com.code.BE.service.internal.productService;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;
import com.code.BE.model.entity.ImageData;
import com.code.BE.model.entity.Product;
import com.code.BE.model.mapper.ProductMapper;
import com.code.BE.repository.ProductRepository;
import com.code.BE.repository.StallRepository;
import com.code.BE.service.external.barcodeService.BarcodeService;
import com.code.BE.service.external.imageService.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private BarcodeService barcodeService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private StallRepository stallRepository;

    private static final String IMAGE_API = "http://localhost:8080/api/v1/images/";

    @Override
    public List<ProductResponse> findAll() {
        return productMapper.toResponseList(productRepository.findAll());
    }

    @Override
    public ProductResponse findById(int id) {
        return productMapper.toResponse(productRepository.findById(id));
    }

    @Override
    public ProductResponse save(ProductRequest productRequest, String countryCode, String manufacturerCode, String productCode) throws Exception {
        Product product = productMapper.toEntity(productRequest);
        String barCode = barcodeService.generateEAN13BarcodeText(countryCode, manufacturerCode, productCode);
        BufferedImage bufferedImage = barcodeService.generateEAN13BarcodeImage(barCode);
        ImageData imageData = imageService.saveImage(bufferedImage, productRequest.getName());

        product.setCode(productCode);
        product.setBarCode(IMAGE_API + imageData.getName());
        product.setStall(stallRepository.findById(productRequest.getStallId()));
        return productMapper.toResponse(productRepository.saveAndFlush(product));
    }

    @Override
    public ProductResponse editById(int id, ProductRequest productRequest) {
        Product product = productRepository.findById(id);
        if (product != null) {
            product.setName(productRequest.getName());
            product.setDescription(productRequest.getName());
            product.setPurchasePrice(productRequest.getPurchasePrice());
            product.setSellPrice(productRequest.getSellPrice());
            product.setQuantity(productRequest.getQuantity());
            product.setStatus(productRequest.isStatus());
            product.setWeight(productRequest.getWeight());
            product.setSize(productRequest.getSize());
            product.setStallLocation(productRequest.getStallLocation());
            product.setType(productRequest.getType());
            product.setStall(stallRepository.findById(productRequest.getStallId()));

            return productMapper.toResponse(productRepository.saveAndFlush(product));
        }
        return null;
    }

    @Override
    public ProductResponse findByCode(String code) {
        return productMapper.toResponse(productRepository.findByCode(code));
    }

    @Override
    public boolean deleteById(int id) {
        Product product = productRepository.findById(id);
        if (product != null) {
            product.setStatus(false);
            productRepository.saveAndFlush(product);
            return true;
        }
        return false;
    }

    @Override
    public List<ProductResponse> findProductsByStallId(int stallId) {
        return productMapper.toResponseList(productRepository.findByStallId(stallId));
    }
}
