package com.study.SpringSecurity.controller;

import com.study.SpringSecurity.dto.AuthenticationResponse;
import com.study.SpringSecurity.dto.UserDto;
import com.study.SpringSecurity.dto.UserRequestDto;
import com.study.SpringSecurity.exception.AuthenticationFailedException;
import com.study.SpringSecurity.model.User;
import com.study.SpringSecurity.service.UserService;
import com.study.SpringSecurity.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@RestController
//@CrossOrigin(
//        origins = "http://localhost:5173",
//        allowedHeaders = "*", // Allows all headers
//        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} // Specific allowed methods
//)

public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserServiceImpl userService;


    @PostMapping("/register")
    public User register(@RequestBody User user){
        return service.register(user);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id){
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody UserRequestDto userRequestDto){

        userService.updateUser(id, userRequestDto);
        return ResponseEntity.ok("User updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User Deleted successfully");
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody User user, HttpServletResponse response) throws AuthenticationFailedException {


        return service.verify(user, response);
    }


}
