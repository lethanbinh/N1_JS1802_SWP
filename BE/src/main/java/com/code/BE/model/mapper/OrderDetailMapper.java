package com.code.BE.model.mapper;

import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    @Mapping(source = "orderDetail.product.id", target = "productId")
    @Mapping(source = "orderDetail.order.id", target = "orderId")

    // Map Entity to Response
    OrderDetailResponse toResponse(OrderDetail orderDetail);
    List<OrderDetailResponse> toResponseList(List<OrderDetail> orderDetailList);
}
