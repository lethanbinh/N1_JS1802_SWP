package com.code.BE.repository;

import com.code.BE.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findById (int roleId);
    Role findByName (String name);
}
