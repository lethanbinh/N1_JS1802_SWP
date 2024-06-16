package com.code.BE.repository;

import com.code.BE.model.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {
    ConfirmationToken findByConfirmationToken (String confirmationToken);
    ConfirmationToken findByUserId (int id);
    ConfirmationToken findById (int id);
}
