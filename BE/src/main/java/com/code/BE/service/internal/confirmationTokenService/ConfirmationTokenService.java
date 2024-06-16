package com.code.BE.service.internal.confirmationTokenService;


import com.code.BE.model.entity.ConfirmationToken;

public interface ConfirmationTokenService {
    ConfirmationToken saveToken (ConfirmationToken confirmationToken);
    void deleteById (int id);
    ConfirmationToken findByUserId (int userId);
    ConfirmationToken findById (int id);
    ConfirmationToken findByConfirmationToken (String token);
}
