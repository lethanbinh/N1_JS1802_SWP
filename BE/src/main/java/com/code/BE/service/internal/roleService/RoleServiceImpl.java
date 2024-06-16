package com.code.BE.service.internal.roleService;

import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.RoleResponse;
import com.code.BE.model.entity.Role;
import com.code.BE.model.mapper.RoleMapper;
import com.code.BE.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public List<RoleResponse> findAll() {
        return roleMapper.toResponseList(roleRepository.findAll());
    }

    @Override
    public RoleResponse findById(int id) {
        return roleMapper.toResponse(roleRepository.findById(id));
    }

    @Override
    public RoleResponse save(RoleRequest roleRequest) {
        Role role = roleMapper.toEntity(roleRequest);
        role.setName(roleRequest.getName().toUpperCase());
        return roleMapper.toResponse(roleRepository.saveAndFlush(role));
    }

    @Override
    public RoleResponse editById(int id, RoleRequest roleRequest) {
        Role role = roleRepository.findById(id);
        if (role != null) {
            role.setName(roleRequest.getName().toUpperCase());
            role.setDescription(roleRequest.getDescription());
            return roleMapper.toResponse(roleRepository.saveAndFlush(role));
        }
        return null;
    }

    @Override
    public RoleResponse findByName(String name) {
        return roleMapper.toResponse(roleRepository.findByName(name));
    }
}
