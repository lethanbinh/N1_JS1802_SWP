package com.code.BE.service.internal.productService;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> findAllProducts ();
    ProductResponse findProductById (int id);
    ProductResponse saveProduct (ProductRequest productRequest);
    boolean deleteProductById (int id);
}
