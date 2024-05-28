package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    @Mapping(source = "orderDetail.order.id", target = "orderId")
    @Mapping(source = "orderDetail.product.id", target = "productId")

    // Map Entity to Response
    OrderDetailResponse toResponse(OrderDetail orderDetail);
    List<OrderDetailResponse> toResponseList(List<OrderDetail> orderDetailList);
    // Map Request to Entity
    OrderDetail toEntity(OrderDetailRequest orderDetailRequest);
    List<OrderDetail> toEntityList(List<OrderDetailRequest> orderDetailRequestList);
}
