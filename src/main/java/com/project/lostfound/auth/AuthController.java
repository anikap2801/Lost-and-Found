package com.project.lostfound.auth;

import com.project.lostfound.model.*;
import com.project.lostfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String userType
    ) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user;

        switch (userType.toUpperCase()) {
            case "REPORTER":
                user = new Reporter(name, email);
                break;
            case "CLAIMANT":
                user = new Claimant(name, email);
                break;
            case "MODERATOR":
                user = new Moderator(name, email);
                break;
            default:
                throw new RuntimeException("Invalid user type");
        }

        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(
            @RequestParam String email,
            @RequestParam String password
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
