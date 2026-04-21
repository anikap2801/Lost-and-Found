package com.project.lostfound.controller;

import com.project.lostfound.factory.UserFactory;
import com.project.lostfound.model.User;
import com.project.lostfound.model.enums.UserType;
import com.project.lostfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam UserType userType) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(name);
                    user.setEmail(email);
                    // Note: User type cannot be changed after creation for simplicity
                    User savedUser = userRepository.save(user);
                    return ResponseEntity.ok(savedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
