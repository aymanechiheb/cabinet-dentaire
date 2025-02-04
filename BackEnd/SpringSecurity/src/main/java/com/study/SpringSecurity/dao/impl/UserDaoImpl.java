package com.study.SpringSecurity.dao.impl;

import com.study.SpringSecurity.dao.interfaces.UserDao;
import com.study.SpringSecurity.model.User;
import com.study.SpringSecurity.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepo userRepo;

    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(userRepo.findByUsername(username));
    }

    @Override
    public Optional<User> findById(Integer id) {
        return Optional.of(userRepo.findById(id)).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public void delete(Integer id) {
        //return userRepo.deleteById(id).orElseThrow(() -> new RuntimeException("User not found"));
         userRepo.deleteById(id);
    }
}
