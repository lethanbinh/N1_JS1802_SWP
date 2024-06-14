package com.code.BE.service.internal.policyService;

import com.code.BE.model.dto.request.PolicyRequest;
import com.code.BE.model.dto.response.PolicyResponse;
import com.code.BE.model.entity.Policy;
import com.code.BE.model.mapper.PolicyMapper;
import com.code.BE.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyServiceImpl implements PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private PolicyMapper policyMapper;

    public List<PolicyResponse> findAll() {
        return policyMapper.toResponseList(policyRepository.findAll());
    }

    @Override
    public PolicyResponse findById(int id) {
        return policyMapper.toResponse(policyRepository.findById(id));
    }

    @Override
    public PolicyResponse save(PolicyRequest policyRequest) {
        Policy policy = policyMapper.toEntity(policyRequest);
        return policyMapper.toResponse(policyRepository.saveAndFlush(policy));
    }

    @Override
    public boolean deleteById(int id) {
        Policy policy = policyRepository.findById(id);
        if (policy != null) {
            policyRepository.deleteById(id);
//            policyRepository.saveAndFlush(policy);
            return true;
        }
        return false;
    }
}
