package com.code.BE.model.mapper;


import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.model.entity.Stall;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StallMapper {
    @Mapping(source = "stall.staff.id", target = "staffId")
    // Map Entity to Response
    StallResponse toResponse(Stall stall);
    List<StallResponse> toResponseList(List<Stall> stallList);
    // Map Request to Entity
    Stall toEntity(StallRequest stallRequest);
    List<Stall> toEntityList(List<StallRequest> stallRequestList);
}
