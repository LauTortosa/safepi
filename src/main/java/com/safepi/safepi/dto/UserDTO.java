package com.safepi.safepi.dto;

import com.safepi.safepi.Entities.Enums.Position;
import com.safepi.safepi.Entities.Enums.Role;
import com.safepi.safepi.Entities.User;

import java.time.LocalDate;
import java.util.Date;

public class UserDTO {
    private Long id;
    private String name;
    private String last_name;
    private String username;
    private String email;
    private LocalDate birthday;
    private LocalDate start_date;
    private Role role;
    private Position position;
    private Integer age;

    public UserDTO() {}

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.last_name = user.getLast_name();
        this.username = user.getName();
        this.email = user.getEmail();
        this.birthday = user.getBirthday();
        this.start_date = user.getStart_date();
        this.role = user.getRole();
        this.position = user.getPosition();
        this.age = user.getAge();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
