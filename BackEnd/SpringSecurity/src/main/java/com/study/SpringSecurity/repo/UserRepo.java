package com.study.SpringSecurity.repo;

import com.study.SpringSecurity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    User findByUsername(String Username);
}

