package com.code.BE.security;

import com.code.BE.model.entity.User;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Kiểm tra xem user có tồn tại trong CSDL không?
        User user = userRepository.findByUsername(username);
        if (user == null) {
           throw new UsernameNotFoundException("User Not Found!");
        }

        return new UserSecurity(user);
    }

}