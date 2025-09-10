package com.klef.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Demospringboot Application 🚀";
    }

    @GetMapping("/springboot")
    public String springboot() {
        return "Hello from Spring Boot! 🎉";
    }
}
