package com.igse.backend.ErrorHandling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@Slf4j
@RestController
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> genericException(Exception e) {
        log.error("Unexpected error", e);
        return new ResponseEntity<>(
                new ErrorResponse(e.getClass().getSimpleName(), "Internal Server Error"),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> AppException(AppException e) {
        return new ResponseEntity<>(
                new ErrorResponse(e.getClass().getSimpleName(), e.getMessage()),
                HttpStatus.BAD_REQUEST);
    }
}
