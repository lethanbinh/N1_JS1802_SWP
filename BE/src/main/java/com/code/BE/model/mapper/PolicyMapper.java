package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.PolicyResponse;
import com.code.BE.model.entity.Policy;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface PolicyMapper {
    PolicyResponse toResponse(Policy policy);
    List<PolicyResponse> toResponseList(List<Policy> PolicyList);

    // Map Request to Entity
    Policy toEntity(PolicyRequest policyRequest);
    List<Policy> toEntityList(List<PolicyRequest> policyRequestList);
}
