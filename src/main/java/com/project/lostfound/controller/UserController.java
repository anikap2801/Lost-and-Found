package com.project.lostfound.controller;

import com.project.lostfound.factory.UserFactory;
import com.project.lostfound.model.User;
import com.project.lostfound.model.enums.UserType;
import com.project.lostfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestParam UserType userType,
            @RequestParam String name,
            @RequestParam String email) {
        User user = UserFactory.createUser(userType, name, email);
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }
}
