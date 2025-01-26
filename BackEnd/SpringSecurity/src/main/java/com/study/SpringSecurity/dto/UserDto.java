package com.study.SpringSecurity.dto;

import com.study.SpringSecurity.model.Role;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int id;
    private String name;
    private String lastname;
    private String Username;
    private Role role;
    private String phone;
    private boolean active;
}
