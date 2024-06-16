package com.code.BE.service.internal.confirmationTokenService;

import com.code.BE.model.entity.ConfirmationToken;
import com.code.BE.repository.ConfirmationTokenRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ConfirmationToken saveToken(ConfirmationToken confirmationToken) {
        return confirmationTokenRepository.saveAndFlush(confirmationToken);
    }

    @Override
    public void deleteById(int id) {
        if (userRepository.findById(id) != null) return;
        confirmationTokenRepository.deleteById(id);
    }

    @Override
    public ConfirmationToken findByUserId(int userId) {
        return confirmationTokenRepository.findByUserId(userId);
    }

    @Override
    public ConfirmationToken findById(int id) {
        return confirmationTokenRepository.findById(id);
    }

    @Override
    public ConfirmationToken findByConfirmationToken(String token) {
        return confirmationTokenRepository.findByConfirmationToken(token);
    }

}
