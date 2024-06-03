package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;
import com.code.BE.model.entity.Promotion;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    PromotionResponse toResponse(Promotion promotion);
    List<PromotionResponse> toResponseList(List<Promotion> PromotionList);

    // Map Request to Entity
    Promotion toEntity(PromotionRequest promotionRequest);
    List<Promotion> toEntityList(List<PromotionRequest> promotionRequestList);
}