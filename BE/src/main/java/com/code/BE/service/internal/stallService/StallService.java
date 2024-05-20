package com.code.BE.service.internal.stallService;

import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.dto.response.ProductResponse;
import com.code.BE.model.dto.response.StallResponse;

import java.util.List;

public interface StallService {
    List<OrderResponse> findAll ();
    StallResponse findById (int id);
    StallResponse save (StallRequest stallRequest);
    boolean deleteById (int id);
}
