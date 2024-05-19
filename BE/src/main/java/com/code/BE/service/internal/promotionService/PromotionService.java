package com.code.BE.service.internal.promotionService;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;

import java.util.List;

public interface PromotionService {
    List<PromotionResponse> findAllPromotions ();
    PromotionResponse findPromotionById (int id);
    PromotionResponse savePromotion (PromotionRequest promotionRequest);
    boolean deletePromotionById (int id);
}
