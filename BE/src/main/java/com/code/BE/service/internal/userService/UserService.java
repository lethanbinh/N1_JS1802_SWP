package com.code.BE.service.internal.userService;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;

public interface UserService {
    UserResponse findUserById (int userID);
    UserResponse updateUserById (UserRequest userRequest);
}
