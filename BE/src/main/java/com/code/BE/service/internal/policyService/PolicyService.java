package com.code.BE.service.internal.policyService;

import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.dto.response.PolicyResponse;

import java.util.List;

public interface PolicyService {
    List<OrderResponse> findAllPolicies ();
    PolicyResponse findPolicyById (int id);
    PolicyResponse savePolicy (PolicyRequest policyRequest);
    boolean deletePolicyById (int id);
}
