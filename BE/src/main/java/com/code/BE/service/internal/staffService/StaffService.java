package com.code.BE.service.internal.staffService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.dto.response.UserResponse;

import java.util.List;

public interface StaffService {
    List<UserResponse> findAllStaffs ();
    UserResponse findStaffById (int id);
    UserResponse saveStaff (UserRequest userRequest);
    boolean deleteStaffById (int id);
    OrderResponse confirmPromotion (OrderRequest orderRequest);
}
