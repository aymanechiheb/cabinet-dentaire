package com.study.SpringSecurity.service;

import com.study.SpringSecurity.dto.AuthenticationResponse;
import com.study.SpringSecurity.dto.UserDto;
import com.study.SpringSecurity.exception.AuthenticationFailedException;
import com.study.SpringSecurity.exception.InvalidTokenException;
import com.study.SpringSecurity.exception.TokenNotFoundException;
import com.study.SpringSecurity.model.User;
import com.study.SpringSecurity.repo.UserRepo;
import com.study.SpringSecurity.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    ApplicationContext context;

    private final UserRepo userRepo;

    private final CookieUtil cookieUtil;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    private final long ACCESS_TOKEN_EXPIRATION = 10 * 60 * 1000;
    private final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000;


    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);

    }

    public AuthenticationResponse verify(User user, HttpServletResponse response) throws AuthenticationFailedException {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),
                        user.getPassword()));

        if(authentication.isAuthenticated()){
            User dbUser = repo.findByUsername(user.getUsername());
            if (dbUser.isActive()){
                String role = dbUser.getRole().name();
                String accessToken = jwtService.generateToken(user.getUsername(), role);
                String refreshToken = jwtService.generateRefreshToken(user.getUsername(), role);
                cookieUtil.createCookie(response, "access_token", accessToken, 10 * 60 * 1000);
                cookieUtil.createCookie(response, "refresh_token", refreshToken, 7 * 24 * 60 * 60);
                return AuthenticationResponse.builder()
                        .message("Authentication successful")
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .user(mapToResponseDTO(dbUser))
                        .build();
            }
            throw new AuthenticationFailedException("Account deactivated");


        }
        throw new AuthenticationFailedException("Invalid username or password");
    }

    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response){
        final String refreshToken = cookieUtil.extractToken(request, "refresh_token");
        if (refreshToken == null) {
            throw new TokenNotFoundException("Refresh token is missing");
        }
        System.out.println(refreshToken);
        String userName = jwtService.extractUserName(refreshToken);
        if (userName == null) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(userName);
        if(!jwtService.validateToken(refreshToken, userDetails)){
            throw new InvalidTokenException("Invalid refresh token");
        }
        String role = jwtService.extractRole(refreshToken);
        String accessToken = jwtService.generateToken(userName, role);
        cookieUtil.createCookie(response, "access_token", accessToken,10 * 60 * 1000);
        return AuthenticationResponse.builder()
                .message("Authentication successful")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    public List<User> getAllUsers(){
        return repo.findAll();
    }

    public Optional<User> findUserById(Integer id){
        return repo.findById(id);
    }



    public User updateUser(Integer id, User updatedUser){
        Optional<User> existingUser = repo.findById(id);
        if(existingUser.isPresent()){
            updatedUser.setId(id);
            return repo.save(updatedUser);
        }else {
            throw new RuntimeException("Patient not found");
        }



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
