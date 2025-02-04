package com.study.SpringSecurity.service.interfaces;

import com.study.SpringSecurity.dto.UserDto;
import com.study.SpringSecurity.dto.UserRequestDto;

import java.util.List;

public interface UserService {
    UserDto getUserByUsername(String username);
    void createUser(UserRequestDto userRequestDto);
    void updateUser(Integer id, UserRequestDto userRequestDto);
    void deleteUser(Integer id);
    List<UserDto> getAllUsers();
}
