package com.code.BE.service.internal.productService;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> findAll ();
    ProductResponse findById (int id);
    ProductResponse save (ProductRequest productRequest, String countryCode, String manufacturerCode, String productCode) throws Exception;
    ProductResponse editById (int id, ProductRequest productRequest);
    ProductResponse findByCode (String code);
    ProductResponse findByBarcode (String barcode);
    boolean deleteById (int id);
    List<ProductResponse> findByStallNameContaining (String name);
    List<ProductResponse> findByNameContaining (String name);
}
