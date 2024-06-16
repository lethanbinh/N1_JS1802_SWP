package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "user.role.id", target = "roleId")
    @Mapping(source = "user.stall.id", target = "stallId")
    @Mapping(source = "user.role.name", target = "roleName")
    @Mapping(source = "user.stall.name", target = "stallName")

    // Map Entity to Response
    UserResponse toResponse(User user);
    List<UserResponse> toResponseList(List<User> userList);
    // Map Request to Entity
    User toEntity(UserRequest userRequest);
    List<User> toEntityList(List<UserRequest> userRequestList);
}
