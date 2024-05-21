package com.code.BE.service.internal.authService;

import com.code.BE.model.dto.request.AuthRequest;
import com.code.BE.model.dto.response.AuthResponse;
import jakarta.mail.MessagingException;

public interface AuthService {
    AuthResponse login (AuthRequest authRequest);
    AuthResponse refreshToken (String refreshToken);
    void sendRecoverEmail (String email) throws MessagingException;
    boolean resetPassword (String email, String password, String token);
    boolean isTokenExpire (String token);
}
