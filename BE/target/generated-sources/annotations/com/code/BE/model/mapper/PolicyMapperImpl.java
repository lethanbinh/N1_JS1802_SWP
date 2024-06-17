package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.PolicyResponse;
import com.code.BE.model.entity.Policy;
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
public class PolicyMapperImpl implements PolicyMapper {

    @Override
    public PolicyResponse toResponse(Policy policy) {
        if ( policy == null ) {
            return null;
        }

        PolicyResponse policyResponse = new PolicyResponse();

        policyResponse.setId( policy.getId() );
        policyResponse.setName( policy.getName() );
        policyResponse.setDetail( policy.getDetail() );
        policyResponse.setType( policy.getType() );

        return policyResponse;
    }

    @Override
    public List<PolicyResponse> toResponseList(List<Policy> PolicyList) {
        if ( PolicyList == null ) {
            return null;
        }

        List<PolicyResponse> list = new ArrayList<PolicyResponse>( PolicyList.size() );
        for ( Policy policy : PolicyList ) {
            list.add( toResponse( policy ) );
        }

        return list;
    }

    @Override
    public Policy toEntity(PolicyRequest policyRequest) {
        if ( policyRequest == null ) {
            return null;
        }

        Policy policy = new Policy();

        policy.setName( policyRequest.getName() );
        policy.setDetail( policyRequest.getDetail() );
        policy.setType( policyRequest.getType() );

        return policy;
    }

    @Override
    public List<Policy> toEntityList(List<PolicyRequest> policyRequestList) {
        if ( policyRequestList == null ) {
            return null;
        }

        List<Policy> list = new ArrayList<Policy>( policyRequestList.size() );
        for ( PolicyRequest policyRequest : policyRequestList ) {
            list.add( toEntity( policyRequest ) );
        }

        return list;
    }
}
