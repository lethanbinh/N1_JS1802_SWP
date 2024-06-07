package com.code.BE.service.internal.userService;

import com.code.BE.model.dto.request.ProfileUpdateRoleAdmin;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.request.ProfileUpdateRoleUser;
import com.code.BE.model.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> findAll ();
    UserResponse findById (int userID);
    UserResponse findByUsername (String username);
    UserResponse findByEmail (String email);
    UserResponse save (UserRequest userRequest);
    List<UserResponse> saveAll (List<UserRequest> userRequests);
    UserResponse updateByIdRoleUser (int userId, ProfileUpdateRoleUser profileUpdateRoleUser);
    UserResponse updateByIdRoleAdmin (int userId, ProfileUpdateRoleAdmin profileUpdateRoleAdmin);
    boolean deleteById (int id);
    List<UserResponse> findByRoleName (String name);
    UserResponse findByPhone (String phone);
}
