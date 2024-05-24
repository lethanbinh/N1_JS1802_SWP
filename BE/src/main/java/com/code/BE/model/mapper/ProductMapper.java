package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;
import com.code.BE.model.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "product.stall.id", target = "stallId")

    // Map Entity to Response
    ProductResponse toResponse(Product product);
    List<ProductResponse> toResponseList(List<Product> productList);
    // Map Request to Entity
    Product toEntity(ProductRequest productRequest);
    List<Product> toEntityList(List<ProductRequest> productRequestList);
}
