package com.study.SpringSecurity.exception;

public class AuthenticationFailedException extends Throwable {
    public AuthenticationFailedException(String message) {
        super(message);
    }
}
