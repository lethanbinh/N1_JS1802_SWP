package com.code.BE.service;

import com.code.BE.model.dto.request.AuthRequest;
import com.code.BE.service.internal.authService.AuthService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AuthServiceTest {
    @Autowired
    private AuthService authService;

    @ParameterizedTest
    @CsvFileSource(resources = "/LoginRole.csv")
    public void testLoginRole (String username, String password, String expectedRole) {
        AuthRequest authRequest = new AuthRequest(username, password);
        Assertions.assertEquals(expectedRole, authService.login(authRequest).getRoleName());
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/LoginUsername.csv")
    public void testLoginUsername (String username, String password, String expectedUsername) {
        AuthRequest authRequest = new AuthRequest(username, password);
        Assertions.assertEquals(expectedUsername, authService.login(authRequest).getUsername());
    }
}
