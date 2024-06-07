package com.code.BE.service.internal.warrantyCardService;

import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.model.dto.response.WarrantyCardResponse;
import com.code.BE.model.entity.WarrantyCard;
import com.code.BE.model.mapper.WarrantyCardMapper;
import com.code.BE.repository.OrderRepository;
import com.code.BE.repository.WarrantyCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class warrantyCardServiceImpl implements WarrantyCardService{

    @Autowired
    private WarrantyCardRepository warrantyCardRepository;

    @Autowired
    private WarrantyCardMapper warrantyCardMapper;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<WarrantyCardResponse> findAll() {
        return warrantyCardMapper.toResponseList(warrantyCardRepository.findAll());
    }

    @Override
    public WarrantyCardResponse findById(int id) {
        return warrantyCardMapper.toResponse(warrantyCardRepository.findById(id));
    }

    public WarrantyCardResponse save(WarrantyCardRequest warrantyCardRequest) {
        WarrantyCard warrantyCard = warrantyCardMapper.toEntity(warrantyCardRequest);
        warrantyCard.setOrderWarranty(orderRepository.findById(warrantyCardRequest.getOrderId()));
        return warrantyCardMapper.toResponse(warrantyCardRepository.saveAndFlush(warrantyCard));
    }

    @Override
    public WarrantyCardResponse editById(int id, WarrantyCardRequest warrantyCardRequest) {
        WarrantyCard warrantyCard = warrantyCardRepository.findById(id);

        if (warrantyCard != null) {
            warrantyCard.setName(warrantyCardRequest.getName());
            warrantyCard.setStartDate(warrantyCardRequest.getStartDate());
            warrantyCard.setEndDate(warrantyCardRequest.getEndDate());
            warrantyCard.setOrderWarranty(orderRepository.findById(warrantyCardRequest.getOrderId()));
            return warrantyCardMapper.toResponse(warrantyCardRepository.saveAndFlush(warrantyCard));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        WarrantyCard warrantyCard = warrantyCardRepository.findById(id);
        if (warrantyCard != null) {
            warrantyCardRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
