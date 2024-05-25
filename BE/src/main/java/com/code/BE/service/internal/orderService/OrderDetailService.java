package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetailResponse> findAll ();
    OrderDetailResponse findById (int id);
    OrderDetailResponse save (OrderDetailRequest orderDetailRequest);
    OrderDetailResponse editById (int id, OrderDetailRequest orderDetailRequest);
    boolean deleteById (int id);
}
