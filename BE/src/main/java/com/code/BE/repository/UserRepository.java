package com.code.BE.repository;

import com.code.BE.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername (String username);
    User findByEmail (String email);
    User findById (int userId);
    User findByPhone (String phone);
    List<User> findByRoleName (String name);
}
