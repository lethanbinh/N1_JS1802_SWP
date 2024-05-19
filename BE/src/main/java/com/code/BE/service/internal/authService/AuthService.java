package com.code.BE.service.internal.authService;

import com.code.BE.model.dto.request.AuthRequest;
import com.code.BE.model.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login (AuthRequest authRequest);
    boolean logout ();
    boolean resetPassword (String userID, String password);
}
