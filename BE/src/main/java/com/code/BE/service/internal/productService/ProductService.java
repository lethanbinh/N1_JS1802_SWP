package com.code.BE.service.internal.productService;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> findAll ();
    ProductResponse findById (int id);
    ProductResponse save (ProductRequest productRequest);
    boolean deleteById (int id);

    List<ProductResponse> findProductsByStallId (int stallId);
}
