package com.study.SpringSecurity.controller;

import com.study.SpringSecurity.dto.AuthenticationResponse;
import com.study.SpringSecurity.service.JWTService;
import com.study.SpringSecurity.service.MyUserDetailService;
import com.study.SpringSecurity.service.UserService;
import com.study.SpringSecurity.util.CookieUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private final JWTService jwtService;

    private final UserService userService;

    private final CookieUtil cookieUtil;

    @Autowired
    ApplicationContext context;
    String username;

    public AuthController(JWTService jwtService, UserService userService, CookieUtil cookieUtil) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.cookieUtil = cookieUtil;
    }


    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(HttpServletRequest request,
                                          HttpServletResponse response){
        return ResponseEntity.ok(userService.refreshToken(request, response));

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Step 1: Retrieve and process the Authorization header
        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7); // Extract the token
//            tokenBlacklistService.addToBlacklist(token); // Add the token to a blacklist
//        }

        // Step 2: Clear cookies storing the token (if applicable)


        cookieUtil.deleteCookie(response, "access_token");
        cookieUtil.deleteCookie(response, "refresh_token");






        // Step 3: Perform container-managed logout (optional for session cleanup)
        try {
            request.logout();
        } catch (ServletException e) {
            return ResponseEntity.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).body("Logout failed");
        }

        // Step 4: Respond to the client
        response.setHeader("Authorization", ""); // Clear the Authorization header
        return ResponseEntity.status(HttpServletResponse.SC_OK).body("Logged out successfully");
    }

//    @PostMapping("/refresh-token")
//    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String refreshTokenHeader) {
//        if (refreshTokenHeader == null || !refreshTokenHeader.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid refresh token format");
//        }
////        username = jwtService.extractUserName(token);
//        String username = jwtService.extractUserName(refreshToken);
//        UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(username);
//
//        String refreshToken = refreshTokenHeader.substring(7);
//
//
//        if (!jwtService.validateToken(refreshToken, userDetails)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid or expired refresh token");
//        }
//
////        String username = jwtService.extractUserName(refreshToken);
//        String newAccessToken = jwtService.generateToken(username);
//
//        return ResponseEntity.ok(Map.of(
//                "accessToken", newAccessToken
//        ));
//    }
}
