package com.code.BE.service.internal.userService;

import com.code.BE.model.dto.request.ProfileUpdateRoleAdmin;
import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.request.ProfileUpdateRoleUser;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.model.entity.Role;
import com.code.BE.model.entity.User;
import com.code.BE.model.mapper.UserMapper;
import com.code.BE.repository.RoleRepository;
import com.code.BE.repository.StallRepository;
import com.code.BE.repository.UserRepository;
import com.code.BE.util.PhoneNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PhoneNumberUtil phoneNumberUtil;

    private static final String IMAGE_API = "http://localhost:8080/api/v1/images/";

    @Override
    public List<UserResponse> findAll() {
        return userMapper.toResponseList(userRepository.findAll());
    }

    @Override
    public UserResponse findById(int userID) {
        return userMapper.toResponse(userRepository.findById(userID));
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

        user.setAvatar(IMAGE_API + userRequest.getAvatar());
        user.setRole(role);
        user.setPhone(phoneNumberUtil.normalizePhoneNumber(userRequest.getPhone()));
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        UserResponse userResponse = userMapper.toResponse(userRepository.saveAndFlush(user));
        userResponse.setPassword(userRequest.getPassword());
        return userResponse;
    }

    @Override
    public List<UserResponse> saveAll(List<UserRequest> userRequests) {
        List<UserResponse> userResponses = new ArrayList<>();
        for (UserRequest userRequest : userRequests) {
            userResponses.add(save(userRequest));
        }
        return userResponses;
    }

    @Override
    public UserResponse updateByIdRoleUser(int userId, ProfileUpdateRoleUser profileUpdateRoleUser) {
        User user = userRepository.findById(userId);
        if (user != null) {
            user.setUsername(profileUpdateRoleUser.getUsername());
            user.setPhone(phoneNumberUtil.normalizePhoneNumber(profileUpdateRoleUser.getPhone()));
            user.setEmail(profileUpdateRoleUser.getEmail());
            user.setAddress(profileUpdateRoleUser.getAddress());
            user.setAvatar(IMAGE_API + profileUpdateRoleUser.getAvatar());
            user.setBirthday(profileUpdateRoleUser.getBirthday());
            return userMapper.toResponse(userRepository.saveAndFlush(user));
        }
        return null;
    }

    @Override
    public UserResponse updateByIdRoleAdmin(int userId, ProfileUpdateRoleAdmin profileUpdateRoleAdmin) {
        User user = userRepository.findById(userId);
        if (user != null) {
            user.setUsername(profileUpdateRoleAdmin.getUsername());
            user.setPhone(phoneNumberUtil.normalizePhoneNumber(profileUpdateRoleAdmin.getPhone()));
            user.setEmail(profileUpdateRoleAdmin.getEmail());
            user.setAddress(profileUpdateRoleAdmin.getAddress());
            user.setAvatar(IMAGE_API + profileUpdateRoleAdmin.getAvatar());
            user.setBirthday(profileUpdateRoleAdmin.getBirthday());
            user.setPointBonus(profileUpdateRoleAdmin.getPointBonus());
            user.setStatus(profileUpdateRoleAdmin.isStatus());
            user.setRole(roleRepository.findById(profileUpdateRoleAdmin.getRoleId()));
            user.setStall(stallRepository.findById(profileUpdateRoleAdmin.getStallId()));

            return userMapper.toResponse(userRepository.saveAndFlush(user));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        User user = userRepository.findById(id);
        if (user != null) {
            user.setStatus(false);
            userRepository.saveAndFlush(user);
            return true;
        }
        return false;
    }

    @Override
    public List<UserResponse> findByRoleName(String name) {
        return userMapper.toResponseList(userRepository.findByRoleName(name.toUpperCase()));
    }

    @Override
    public UserResponse findByPhone(String phone) {
        return userMapper.toResponse(userRepository.findByPhone(phoneNumberUtil.normalizePhoneNumber(phone)));
    }
}
