package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.model.dto.response.WarrantyCardResponse;
import com.code.BE.model.entity.WarrantyCard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WarrantyCardMapper {
    @Mapping(source = "warrantyCard.orderWarranty.id", target = "orderId")

    // Map Entity to Response
    WarrantyCardResponse toResponse(WarrantyCard warrantyCard);
    List<WarrantyCardResponse> toResponseList(List<WarrantyCard> warrantyCardList);
    // Map Request to Entity
    WarrantyCard toEntity(WarrantyCardRequest warrantyCardRequest);
    List<WarrantyCard> toEntityList(List<WarrantyCardRequest> warrantyCardRequestList);
}
