package com.code.BE.service.internal.stallService;



import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;

import java.util.List;

public interface StallService {
    List<StallResponse> findAll ();
    StallResponse findById (int id);
    StallResponse save (StallRequest stallRequest);
    StallResponse editById (int id, StallRequest stallRequest);
    boolean deleteById (int id);

    StallResponse findByCode(String code);
    List<StallResponse> findByNameContaining (String name);
}
