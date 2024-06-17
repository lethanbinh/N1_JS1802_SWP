package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.model.dto.response.WarrantyCardResponse;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.WarrantyCard;
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
public class WarrantyCardMapperImpl implements WarrantyCardMapper {

    @Override
    public WarrantyCardResponse toResponse(WarrantyCard warrantyCard) {
        if ( warrantyCard == null ) {
            return null;
        }

        WarrantyCardResponse warrantyCardResponse = new WarrantyCardResponse();

        warrantyCardResponse.setOrderId( warrantyCardOrderWarrantyId( warrantyCard ) );
        warrantyCardResponse.setId( warrantyCard.getId() );
        warrantyCardResponse.setName( warrantyCard.getName() );
        warrantyCardResponse.setStartDate( warrantyCard.getStartDate() );
        warrantyCardResponse.setEndDate( warrantyCard.getEndDate() );

        return warrantyCardResponse;
    }

    @Override
    public List<WarrantyCardResponse> toResponseList(List<WarrantyCard> warrantyCardList) {
        if ( warrantyCardList == null ) {
            return null;
        }

        List<WarrantyCardResponse> list = new ArrayList<WarrantyCardResponse>( warrantyCardList.size() );
        for ( WarrantyCard warrantyCard : warrantyCardList ) {
            list.add( toResponse( warrantyCard ) );
        }

        return list;
    }

    @Override
    public WarrantyCard toEntity(WarrantyCardRequest warrantyCardRequest) {
        if ( warrantyCardRequest == null ) {
            return null;
        }

        WarrantyCard warrantyCard = new WarrantyCard();

        warrantyCard.setName( warrantyCardRequest.getName() );
        warrantyCard.setStartDate( warrantyCardRequest.getStartDate() );
        warrantyCard.setEndDate( warrantyCardRequest.getEndDate() );

        return warrantyCard;
    }

    @Override
    public List<WarrantyCard> toEntityList(List<WarrantyCardRequest> warrantyCardRequestList) {
        if ( warrantyCardRequestList == null ) {
            return null;
        }

        List<WarrantyCard> list = new ArrayList<WarrantyCard>( warrantyCardRequestList.size() );
        for ( WarrantyCardRequest warrantyCardRequest : warrantyCardRequestList ) {
            list.add( toEntity( warrantyCardRequest ) );
        }

        return list;
    }

    private int warrantyCardOrderWarrantyId(WarrantyCard warrantyCard) {
        if ( warrantyCard == null ) {
            return 0;
        }
        Order orderWarranty = warrantyCard.getOrderWarranty();
        if ( orderWarranty == null ) {
            return 0;
        }
        int id = orderWarranty.getId();
        return id;
    }
}
