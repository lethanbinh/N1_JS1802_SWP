package com.code.BE.service.internal.staffService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.dto.response.UserResponse;

import java.util.List;

public interface StaffService {
    List<UserResponse> findAll ();
    UserResponse findById (int id);
    UserResponse save (UserRequest userRequest);
    boolean deleteById (int id);
}
