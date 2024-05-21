package com.code.BE.service.internal.userService;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> findAll ();
    UserResponse findById (int userID);
    UserResponse findByUsername (String username);
    UserResponse findByEmail (String email);
    UserResponse save (UserRequest userRequest);
    boolean deleteById (int id);
}
