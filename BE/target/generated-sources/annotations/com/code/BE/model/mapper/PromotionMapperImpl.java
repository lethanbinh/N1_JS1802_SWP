package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;
import com.code.BE.model.entity.Promotion;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-17T10:41:50+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class PromotionMapperImpl implements PromotionMapper {

    @Override
    public PromotionResponse toResponse(Promotion promotion) {
        if ( promotion == null ) {
            return null;
        }

        PromotionResponse promotionResponse = new PromotionResponse();

        promotionResponse.setId( promotion.getId() );
        promotionResponse.setDiscount( promotion.getDiscount() );
        promotionResponse.setName( promotion.getName() );
        promotionResponse.setDescription( promotion.getDescription() );
        promotionResponse.setStartDate( promotion.getStartDate() );
        promotionResponse.setEndDate( promotion.getEndDate() );
        promotionResponse.setMinimumPrize( promotion.getMinimumPrize() );
        promotionResponse.setMaximumPrize( promotion.getMaximumPrize() );

        return promotionResponse;
    }

    @Override
    public List<PromotionResponse> toResponseList(List<Promotion> PromotionList) {
        if ( PromotionList == null ) {
            return null;
        }

        List<PromotionResponse> list = new ArrayList<PromotionResponse>( PromotionList.size() );
        for ( Promotion promotion : PromotionList ) {
            list.add( toResponse( promotion ) );
        }

        return list;
    }

    @Override
    public Promotion toEntity(PromotionRequest promotionRequest) {
        if ( promotionRequest == null ) {
            return null;
        }

        Promotion promotion = new Promotion();

        promotion.setDiscount( promotionRequest.getDiscount() );
        promotion.setName( promotionRequest.getName() );
        promotion.setDescription( promotionRequest.getDescription() );
        promotion.setStartDate( promotionRequest.getStartDate() );
        promotion.setEndDate( promotionRequest.getEndDate() );
        promotion.setMinimumPrize( promotionRequest.getMinimumPrize() );
        promotion.setMaximumPrize( promotionRequest.getMaximumPrize() );

        return promotion;
    }

    @Override
    public List<Promotion> toEntityList(List<PromotionRequest> promotionRequestList) {
        if ( promotionRequestList == null ) {
            return null;
        }

        List<Promotion> list = new ArrayList<Promotion>( promotionRequestList.size() );
        for ( PromotionRequest promotionRequest : promotionRequestList ) {
            list.add( toEntity( promotionRequest ) );
        }

        return list;
    }
}
