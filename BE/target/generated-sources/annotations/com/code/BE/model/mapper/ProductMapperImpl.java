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
    date = "2024-06-17T10:41:50+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
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
        productResponse.setId( product.getId() );
        productResponse.setName( product.getName() );
        productResponse.setImage( product.getImage() );
        productResponse.setDescription( product.getDescription() );
        productResponse.setPurchasePrice( product.getPurchasePrice() );
        productResponse.setSellPrice( product.getSellPrice() );
        productResponse.setQuantity( product.getQuantity() );
        productResponse.setStatus( product.isStatus() );
        productResponse.setWeight( product.getWeight() );
        productResponse.setSize( product.getSize() );
        productResponse.setStallLocation( product.getStallLocation() );
        productResponse.setType( product.getType() );
        productResponse.setCode( product.getCode() );
        productResponse.setBarCode( product.getBarCode() );
        productResponse.setBarCodeText( product.getBarCodeText() );
        productResponse.setQrCode( product.getQrCode() );

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

        product.setName( productRequest.getName() );
        product.setImage( productRequest.getImage() );
        product.setDescription( productRequest.getDescription() );
        product.setPurchasePrice( productRequest.getPurchasePrice() );
        product.setSellPrice( productRequest.getSellPrice() );
        product.setQuantity( productRequest.getQuantity() );
        product.setStatus( productRequest.isStatus() );
        product.setWeight( productRequest.getWeight() );
        product.setSize( productRequest.getSize() );
        product.setStallLocation( productRequest.getStallLocation() );
        product.setType( productRequest.getType() );

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
