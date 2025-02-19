package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.User;
import com.safepi.safepi.Services.JwtService;
import com.safepi.safepi.Services.UserService;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody User userLogin) {
        User user = userService.getUserByUsername(userLogin.getUsername());

        if (user == null || !user.getPassword().equals(userLogin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody String refreshToken) {
        try {
            String username = jwtService.extractUserName(refreshToken);
            String role = "ROLE_USER";

            if (username == null || !jwtService.validateToken(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            String newAccessToken = jwtService.generateToken(username, role);

            return ResponseEntity.ok(newAccessToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<User> getUserProfile(Authentication authentication) {
        String username = authentication.getName();

        User user = userService.getUserByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(user);
    }
}
