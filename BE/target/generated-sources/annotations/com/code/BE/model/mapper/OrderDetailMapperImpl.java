package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.OrderDetail;
import com.code.BE.model.entity.Product;
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
public class OrderDetailMapperImpl implements OrderDetailMapper {

    @Override
    public OrderDetailResponse toResponse(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }

        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();

        orderDetailResponse.setOrderId( orderDetailOrderId( orderDetail ) );
        orderDetailResponse.setProductId( orderDetailProductId( orderDetail ) );
        orderDetailResponse.setId( orderDetail.getId() );
        orderDetailResponse.setProductName( orderDetail.getProductName() );
        orderDetailResponse.setProductPrice( orderDetail.getProductPrice() );
        orderDetailResponse.setProductQuantity( orderDetail.getProductQuantity() );
        orderDetailResponse.setTotalPrice( orderDetail.getTotalPrice() );

        return orderDetailResponse;
    }

    @Override
    public List<OrderDetailResponse> toResponseList(List<OrderDetail> orderDetailList) {
        if ( orderDetailList == null ) {
            return null;
        }

        List<OrderDetailResponse> list = new ArrayList<OrderDetailResponse>( orderDetailList.size() );
        for ( OrderDetail orderDetail : orderDetailList ) {
            list.add( toResponse( orderDetail ) );
        }

        return list;
    }

    @Override
    public OrderDetail toEntity(OrderDetailRequest orderDetailRequest) {
        if ( orderDetailRequest == null ) {
            return null;
        }

        OrderDetail orderDetail = new OrderDetail();

        orderDetail.setProductQuantity( orderDetailRequest.getProductQuantity() );

        return orderDetail;
    }

    @Override
    public List<OrderDetail> toEntityList(List<OrderDetailRequest> orderDetailRequestList) {
        if ( orderDetailRequestList == null ) {
            return null;
        }

        List<OrderDetail> list = new ArrayList<OrderDetail>( orderDetailRequestList.size() );
        for ( OrderDetailRequest orderDetailRequest : orderDetailRequestList ) {
            list.add( toEntity( orderDetailRequest ) );
        }

        return list;
    }

    private int orderDetailOrderId(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return 0;
        }
        Order order = orderDetail.getOrder();
        if ( order == null ) {
            return 0;
        }
        int id = order.getId();
        return id;
    }

    private int orderDetailProductId(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return 0;
        }
        Product product = orderDetail.getProduct();
        if ( product == null ) {
            return 0;
        }
        int id = product.getId();
        return id;
    }
}
