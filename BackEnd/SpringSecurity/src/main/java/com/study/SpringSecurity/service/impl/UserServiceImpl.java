package com.study.SpringSecurity.service.impl;

import com.study.SpringSecurity.dao.interfaces.UserDao;
import com.study.SpringSecurity.dto.UserDto;
import com.study.SpringSecurity.dto.UserRequestDto;
import com.study.SpringSecurity.model.User;
import com.study.SpringSecurity.repo.UserRepo;
import com.study.SpringSecurity.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserDao userDao;

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponseDTO(user);
    }

    public UserDto getUserById(Integer id){
        User user = userDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponseDTO(user);
    }

    @Override
    public void createUser(UserRequestDto userRequestDto) {
        if (userDao.existsByUsername(userRequestDto.getUsername())) {
            throw new RuntimeException("Username Already Exists");
        }
        User user = mapToEntity(userRequestDto);
        userDao.save(user);
    }

    @Override
    public void updateUser(Integer id, UserRequestDto userRequestDto) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (userRequestDto.getUsername() != null){
            boolean isUserExist = userDao.existsByUsername(userRequestDto.getUsername());
            if(!isUserExist){
                user.setUsername(userRequestDto.getUsername());
            }



        }
        if(userRequestDto.getName() != null){
            user.setName(userRequestDto.getName());
        }

        if(userRequestDto.getLastname() != null){
            user.setLastname(userRequestDto.getLastname());
        }

        if(userRequestDto.getPhone() != null){
            user.setPhone(userRequestDto.getPhone());
        }

        if(userRequestDto.isActive()){
            user.setActive(true);
        }

        if(userRequestDto.getRole() != null){
            user.setRole(userRequestDto.getRole());
        }


        userDao.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userDao.delete(user.getId());

    }

    @Override
    public List<UserDto> getAllUsers() {
        return userDao.getAllUsers().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private User mapToEntity(UserRequestDto dto) {
        User user = new User();

        user.setName(dto.getName());
        user.setLastname(dto.getLastname());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setActive(dto.isActive());
        user.setRole(dto.getRole());
        return user;
    }

    private UserDto mapToResponseDTO(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setLastname(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setPhone(user.getPhone());
        dto.setActive(user.isActive());
        dto.setRole(user.getRole());
        return dto;
    }
}
