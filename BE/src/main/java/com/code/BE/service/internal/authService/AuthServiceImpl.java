package com.code.BE.service.internal.authService;

import com.code.BE.model.dto.request.AuthRequest;
import com.code.BE.model.dto.response.AuthResponse;
import com.code.BE.model.entity.ConfirmationToken;
import com.code.BE.model.entity.User;
import com.code.BE.repository.UserRepository;
import com.code.BE.security.JwtToken;
import com.code.BE.security.UserSecurity;
import com.code.BE.service.external.mailService.MailService;
import com.code.BE.service.internal.confirmationTokenService.ConfirmationTokenService;
import com.code.BE.service.internal.roleService.RoleService;
import com.code.BE.service.internal.userService.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MailService mailService;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private RoleService roleService;

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );

            User user = userRepository.findByUsername(authRequest.getUsername());
            if (user != null) {
                UserSecurity userSecurity = new UserSecurity(user);

                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("username", user.getUsername());
                extraClaims.put("authorities", userSecurity.getAuthorities());

                String accessToken = jwtToken.generateToken(extraClaims, userSecurity);
                String refreshToken = jwtToken.generateRefreshToken(userSecurity);

                AuthResponse authResponse = new AuthResponse();
                authResponse.setUsername(authRequest.getUsername());
                authResponse.setAccessToken(accessToken);
                authResponse.setRefreshToken(refreshToken);
                authResponse.setRoleName(user.getRole().getName());

                return authResponse;
            }
        } catch (Exception ex) {
//            AuthResponse authResponse = new AuthResponse();
//            authResponse.setAccessToken("Username or Password Error");
//            authResponse.setRefreshToken("Username or Password Error");
//            authResponse.setRoleName("Username or Password Error");
//            authResponse.setUsername("Username or Password Error");
//            return authResponse;

            throw ex;
        }
        return null;
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        if (jwtToken.isTokenValid(refreshToken, new UserSecurity(userRepository.findByUsername(jwtToken.extractUsername(refreshToken))))) {
            String username = jwtToken.extractUsername(refreshToken);
            User user = userRepository.findByUsername(username);

            if (user != null) {
                UserSecurity userSecurity = new UserSecurity(user);

                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("username", user.getUsername());
                extraClaims.put("authorities", userSecurity.getAuthorities());

                String newAccessToken = jwtToken.generateToken(extraClaims, userSecurity);
                String newRefreshToken = jwtToken.generateRefreshToken(userSecurity);

                AuthResponse authResponse = new AuthResponse();
                authResponse.setUsername(username);
                authResponse.setAccessToken(newAccessToken);
                authResponse.setRefreshToken(newRefreshToken);
                authResponse.setRoleName(user.getRole().getName());

                return authResponse;
            }
        }
        return null;
    }

    @Override
    public void sendRecoverEmail(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            ConfirmationToken oldToken = confirmationTokenService.findByUserId
                    (userRepository.findByUsername(user.getUsername()).getId());
            if (oldToken != null) {
                confirmationTokenService.deleteById(oldToken.getId());
            }

            ConfirmationToken confirmationToken = new ConfirmationToken(userRepository.findByEmail(email));
            confirmationToken.setExpiredDate(LocalDateTime.now().plusMinutes(30));
            confirmationTokenService.saveToken(confirmationToken);

            String htmlTemplate = """
                    <div>
                        <a href="http://localhost:3000/home#/create-new-password?email=${email}&token=${token}" alt="">
                        Click here to reset your account's password</a>. This link will be expired in 30 minutes.
                    <div>
                    """;
            htmlTemplate = htmlTemplate.replace("${email}", email);
            htmlTemplate = htmlTemplate.replace("${token}", confirmationToken.getConfirmationToken());

            mailService.sendEmail("lethanhbinh6122003@gmail.com", email, "Confirm account", htmlTemplate);
        }
    }

    @Override
    public boolean resetPassword(String email, String password, String token) {
        // check token's email is at the same with email of the account you want to reset
        if (email.equalsIgnoreCase(confirmationTokenService.findByConfirmationToken(token).getUser().getEmail())
                && !isTokenExpire(token)) {
            User user = userRepository.findByEmail(email);
            user.setPassword(passwordEncoder.encode(password));

            // delete token after resetting password
            confirmationTokenService.deleteById(confirmationTokenService.findByConfirmationToken(token).getId());
            return true;
        }
        return false;
    }

    @Override
    public boolean isTokenExpire(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByConfirmationToken(token);
        if (confirmationToken == null) return true;
        return LocalDateTime.now().isAfter(confirmationToken.getExpiredDate());
    }

}
