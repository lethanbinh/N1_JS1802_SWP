package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.RoleResponse;
import com.code.BE.model.entity.Role;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponse toResponse(Role role);
    List<RoleResponse> toResponseList(List<Role> roleList);

    // Map Request to Entity
    Role toEntity(RoleRequest roleRequest);
    List<Role> toEntityList(List<RoleRequest> roleRequestList);
}
