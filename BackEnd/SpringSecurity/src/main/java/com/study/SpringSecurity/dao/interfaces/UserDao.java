package com.study.SpringSecurity.dao.interfaces;

import com.study.SpringSecurity.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {

    User save(User user);
    void delete(Integer userId);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Integer id);
    boolean existsByUsername(String username);
    List<User> getAllUsers();
}
