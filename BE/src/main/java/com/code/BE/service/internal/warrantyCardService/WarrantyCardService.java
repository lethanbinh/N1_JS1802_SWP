package com.code.BE.service.internal.warrantyCardService;

import com.code.BE.model.dto.request.WarrantyCardRequest;
import com.code.BE.model.dto.response.WarrantyCardResponse;

import java.util.List;

public interface WarrantyCardService {
    List<WarrantyCardResponse> findAll ();
    WarrantyCardResponse findById (int id);
    WarrantyCardResponse save (WarrantyCardRequest warrantyCardRequest);
    WarrantyCardResponse editById (int id, WarrantyCardRequest warrantyCardRequest);
    boolean deleteById (int id);
}
