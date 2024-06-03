package com.code.BE.service.internal.promotionService;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;
import com.code.BE.model.entity.Promotion;
import com.code.BE.model.entity.Stall;
import com.code.BE.model.mapper.PromotionMapper;

import com.code.BE.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService{

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionMapper promotionMapper;

    @Override
    public List<PromotionResponse> findAll() {
        return promotionMapper.toResponseList(promotionRepository.findAll());
    }

    @Override
    public PromotionResponse findById(int id) {
        return promotionMapper.toResponse(promotionRepository.findById(id));
    }

    @Override
    public PromotionResponse save(PromotionRequest promotionRequest) {
        Promotion promotion = promotionMapper.toEntity(promotionRequest);
        return promotionMapper.toResponse(promotionRepository.saveAndFlush(promotion));
    }

    @Override
    public boolean deleteById(int id) {
        Promotion promotion = promotionRepository.findById(id);
        if (promotion != null) {
            promotionRepository.deleteById(id);
//            promotionRepository.saveAndFlush(promotion);
            return true;
        }
        return false;
    }

    @Override
    public PromotionResponse editById(int id, PromotionRequest promotionRequest) {
        Promotion promotion = promotionRepository.findById(id);

        if (promotion != null) {
            promotion.setMinimumPrize(promotionRequest.getMinimumPrize());
            promotion.setMaximumPrize(promotionRequest.getMaximumPrize());
            promotion.setName(promotionRequest.getName());
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setDiscount(promotionRequest.getDiscount());
            promotion.setEndDate(promotionRequest.getEndDate());
            promotion.setStartDate(promotionRequest.getStartDate());
            return promotionMapper.toResponse(promotionRepository.saveAndFlush(promotion));
        }
        return null;
    }
}
