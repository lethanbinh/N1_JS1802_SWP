package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "order.promotion.id", target = "promotionId")
    @Mapping(source = "order.staff.id", target = "staffId")

        // Map Entity to Response
    OrderResponse toResponse(Order order);
    List<OrderResponse> toResponseList(List<Order> orderList);
    // Map Request to Entity
    Order toEntity(OrderRequest orderRequest);
    List<Order> toEntityList(List<OrderRequest> orderRequestList);
}
