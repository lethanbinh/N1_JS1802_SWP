package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Order;

import java.util.List;

public interface OrderService {
    List<OrderResponse> findAll ();
    OrderResponse findById (int id);
    List<OrderResponse> findByStaffFullNameContaining (String name);
    List<OrderResponse> findByCustomerFullNameContaining (String name);
    OrderResponse save (OrderRequest orderRequest);
    OrderResponse editById (int id, OrderRequest orderRequest);

    // reuse services
    List<OrderDetailResponse> findOrderDetailsByOrderId (int id);
    List<OrderResponse> returnOrderList (List<OrderResponse> orderResponses);
    OrderResponse saveOrderAndOrderDetail (Order order, OrderRequest orderRequest);
}
