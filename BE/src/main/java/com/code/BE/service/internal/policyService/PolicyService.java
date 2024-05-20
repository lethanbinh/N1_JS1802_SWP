package com.code.BE.service.internal.policyService;

import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.PolicyResponse;

import java.util.List;

public interface PolicyService {
    List<PolicyResponse> findAll ();
    PolicyResponse findById (int id);
    PolicyResponse save (PolicyRequest policyRequest);
    boolean deleteById (int id);
}
