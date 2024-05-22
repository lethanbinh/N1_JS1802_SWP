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
        return stallMapper.toResponse(stallRepository.saveAndFlush(stall));
    }

    @Override
    public StallResponse editById(int id, StallRequest stallRequest) {
        Stall stall = stallRepository.findById(id);
        if (stall != null) {
            return stallMapper.toResponse(stallRepository.saveAndFlush(stall));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        try {
            stallRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public StallResponse findByCode(String code) {
        return stallMapper.toResponse(stallRepository.findByCode(code));
    }
}
