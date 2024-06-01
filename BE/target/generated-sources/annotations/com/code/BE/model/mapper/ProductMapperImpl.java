package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ProductResponse;
import com.code.BE.model.entity.Product;
import com.code.BE.model.entity.Stall;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-31T20:14:14+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240524-2033, environment: Java 17.0.11 (Eclipse Adoptium)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductResponse toResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductResponse productResponse = new ProductResponse();

        productResponse.setStallId( productStallId( product ) );
        productResponse.setBarCode( product.getBarCode() );
        productResponse.setBarCodeText( product.getBarCodeText() );
        productResponse.setCode( product.getCode() );
        productResponse.setDescription( product.getDescription() );
        productResponse.setId( product.getId() );
        productResponse.setImage( product.getImage() );
        productResponse.setName( product.getName() );
        productResponse.setPurchasePrice( product.getPurchasePrice() );
        productResponse.setQrCode( product.getQrCode() );
        productResponse.setQuantity( product.getQuantity() );
        productResponse.setSellPrice( product.getSellPrice() );
        productResponse.setSize( product.getSize() );
        productResponse.setStallLocation( product.getStallLocation() );
        productResponse.setStatus( product.isStatus() );
        productResponse.setType( product.getType() );
        productResponse.setWeight( product.getWeight() );

        return productResponse;
    }

    @Override
    public List<ProductResponse> toResponseList(List<Product> productList) {
        if ( productList == null ) {
            return null;
        }

        List<ProductResponse> list = new ArrayList<ProductResponse>( productList.size() );
        for ( Product product : productList ) {
            list.add( toResponse( product ) );
        }

        return list;
    }

    @Override
    public Product toEntity(ProductRequest productRequest) {
        if ( productRequest == null ) {
            return null;
        }

        Product product = new Product();

        product.setDescription( productRequest.getDescription() );
        product.setImage( productRequest.getImage() );
        product.setName( productRequest.getName() );
        product.setPurchasePrice( productRequest.getPurchasePrice() );
        product.setQuantity( productRequest.getQuantity() );
        product.setSellPrice( productRequest.getSellPrice() );
        product.setSize( productRequest.getSize() );
        product.setStallLocation( productRequest.getStallLocation() );
        product.setStatus( productRequest.isStatus() );
        product.setType( productRequest.getType() );
        product.setWeight( productRequest.getWeight() );

        return product;
    }

    @Override
    public List<Product> toEntityList(List<ProductRequest> productRequestList) {
        if ( productRequestList == null ) {
            return null;
        }

        List<Product> list = new ArrayList<Product>( productRequestList.size() );
        for ( ProductRequest productRequest : productRequestList ) {
            list.add( toEntity( productRequest ) );
        }

        return list;
    }

    private int productStallId(Product product) {
        if ( product == null ) {
            return 0;
        }
        Stall stall = product.getStall();
        if ( stall == null ) {
            return 0;
        }
        int id = stall.getId();
        return id;
    }
}
