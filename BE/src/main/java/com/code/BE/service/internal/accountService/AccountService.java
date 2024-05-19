package com.code.BE.service.internal.accountService;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;

import java.util.List;

public interface AccountService {
    List<UserResponse> findAllUsers ();
    UserResponse findUserById (int id);
    UserResponse saveUser (UserRequest userRequest);
    boolean deleteUserById (int id);
}
