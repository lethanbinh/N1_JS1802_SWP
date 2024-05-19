package com.code.BE.service.internal.stallService;

import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.dto.response.StallResponse;

import java.util.List;

public interface StallService {
    List<OrderResponse> findAllStalls ();
    StallResponse findStallById (int id);
    StallResponse saveStall (StallRequest stallRequest);
    boolean deleteStallById (int id);
}
