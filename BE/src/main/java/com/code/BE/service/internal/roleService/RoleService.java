package com.code.BE.service.internal.roleService;

import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.RoleResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    List<RoleResponse> findAll();

    RoleResponse findById(int id);

    RoleResponse save(RoleRequest roleRequest);

    RoleResponse editById(int id, RoleRequest roleName);

    RoleResponse findByName(String name);
}
