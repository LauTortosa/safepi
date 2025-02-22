package com.safepi.safepi.Services;

import com.safepi.safepi.Entities.Enums.Position;
import com.safepi.safepi.Entities.User;
import com.safepi.safepi.Repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        existingUser.setName(user.getName());
        existingUser.setBirthday(user.getBirthday());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        existingUser.setPosition(user.getPosition());
        existingUser.setLast_name(user.getLast_name());
        existingUser.setStart_date(user.getStart_date());
        existingUser.setUsername(user.getUsername());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no existe");
        }

        userRepository.deleteById(id);
    }
    public List<Position> getAllPositions() {
        return Arrays.asList(Position.values());
    }
}
