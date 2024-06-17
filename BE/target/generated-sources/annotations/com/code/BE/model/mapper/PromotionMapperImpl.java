package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.PromotionRequest;
import com.code.BE.model.dto.response.PromotionResponse;
import com.code.BE.model.entity.Promotion;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-17T07:41:35+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240524-2033, environment: Java 17.0.11 (Eclipse Adoptium)"
)
@Component
public class PromotionMapperImpl implements PromotionMapper {

    @Override
    public PromotionResponse toResponse(Promotion promotion) {
        if ( promotion == null ) {
            return null;
        }

        PromotionResponse promotionResponse = new PromotionResponse();

        promotionResponse.setDescription( promotion.getDescription() );
        promotionResponse.setDiscount( promotion.getDiscount() );
        promotionResponse.setEndDate( promotion.getEndDate() );
        promotionResponse.setId( promotion.getId() );
        promotionResponse.setMaximumPrize( promotion.getMaximumPrize() );
        promotionResponse.setMinimumPrize( promotion.getMinimumPrize() );
        promotionResponse.setName( promotion.getName() );
        promotionResponse.setStartDate( promotion.getStartDate() );

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

        promotion.setDescription( promotionRequest.getDescription() );
        promotion.setDiscount( promotionRequest.getDiscount() );
        promotion.setEndDate( promotionRequest.getEndDate() );
        promotion.setMaximumPrize( promotionRequest.getMaximumPrize() );
        promotion.setMinimumPrize( promotionRequest.getMinimumPrize() );
        promotion.setName( promotionRequest.getName() );
        promotion.setStartDate( promotionRequest.getStartDate() );

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
