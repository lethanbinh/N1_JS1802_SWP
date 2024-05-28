package com.code.BE.service.internal.stallService;

import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.model.entity.Stall;
import com.code.BE.model.mapper.StallMapper;
import com.code.BE.repository.StallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallServiceImpl implements StallService {

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private StallMapper stallMapper;

    @Override
    public List<StallResponse> findAll() {
        return stallMapper.toResponseList(stallRepository.findAll());
    }

    @Override
    public StallResponse findById(int id) {
        return stallMapper.toResponse(stallRepository.findById(id));
    }

    @Override
    public StallResponse save(StallRequest stallRequest) {
        Stall stall = stallMapper.toEntity(stallRequest);
        stall.setStatus(true);
        return stallMapper.toResponse(stallRepository.saveAndFlush(stall));
    }

    @Override
    public StallResponse editById(int id, StallRequest stallRequest) {
        Stall stall = stallRepository.findById(id);

        if (stall != null) {
            stall.setCode(stallRequest.getCode());
            stall.setName(stallRequest.getName());
            stall.setType(stallRequest.getType());
            stall.setDescription(stallRequest.getDescription());
            stall.setStatus(stallRequest.isStatus());
            return stallMapper.toResponse(stallRepository.saveAndFlush(stall));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        Stall stall = stallRepository.findById(id);
        if (stall != null) {
            stall.setStatus(false);
            stallRepository.saveAndFlush(stall);
            return true;
        }
        return false;
    }

    @Override
    public StallResponse findByCode(String code) {
        return stallMapper.toResponse(stallRepository.findByCode(code));
    }

    @Override
    public List<StallResponse> findByNameContaining(String name) {
        return stallMapper.toResponseList(stallRepository.findByNameContaining(name));
    }
}
