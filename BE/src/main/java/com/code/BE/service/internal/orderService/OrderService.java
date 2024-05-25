package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> findAll ();
    OrderResponse findById (int id);
    OrderResponse save (OrderRequest orderRequest);
    OrderResponse editById (int id, OrderRequest orderRequest);
}
