package com.code.BE.service.internal.promotionService;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;

import java.util.List;

public interface PromotionService {
    List<PromotionResponse> findAll ();
    PromotionResponse findById (int id);
    PromotionResponse save (PromotionRequest promotionRequest);
    boolean deleteById (int id);
    PromotionResponse editById (int id, PromotionRequest promotionRequest);
}
