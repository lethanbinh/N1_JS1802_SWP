package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> findAllOrders ();
    OrderResponse findOrderById (int id);
    OrderResponse saveOrder (OrderRequest orderRequest);
    boolean deleteOrderById (int id);

    OrderDetailResponse addProductByCode (String code);
    OrderDetailResponse addProductByBarCode (String barCode);
    OrderDetailResponse updateProductByBarCode (String barCode);
    boolean deleteProduct (int code);
}
