package com.study.SpringSecurity.dto;

import com.study.SpringSecurity.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    private String name;
    private String lastname;
    private String username;
    private String password;
    private String phone;
    private boolean active;
    private Role role;
}
