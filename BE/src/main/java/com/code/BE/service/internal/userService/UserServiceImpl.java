package com.code.BE.service.internal.userService;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.model.entity.Role;
import com.code.BE.model.entity.User;
import com.code.BE.model.mapper.UserMapper;
import com.code.BE.repository.RoleRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> findAll() {
        return userMapper.toResponseList(userRepository.findAll());
    }

    @Override
    public UserResponse findById(int userID) {
        return userMapper.toResponse(userRepository.findById(userID).orElse(null));
    }

    @Override
    public UserResponse findByUsername(String username) {
        return userMapper.toResponse(userRepository.findByUsername(username));
    }

    @Override
    public UserResponse findByEmail(String email) {
        return userMapper.toResponse(userRepository.findByEmail(email));
    }

    @Override
    public UserResponse save(UserRequest userRequest) {
        User user = userMapper.toEntity(userRequest);
        user.setRegisterDate(new Date());

        Role role = roleRepository.findById(userRequest.getRoleId());
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        return userMapper.toResponse(userRepository.saveAndFlush(user));
    }

    @Override
    public boolean deleteById(int id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
