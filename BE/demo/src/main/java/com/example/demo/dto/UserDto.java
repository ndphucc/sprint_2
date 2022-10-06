package com.example.demo.dto;

import com.example.demo.model.AppRole;

import java.util.List;

public class UserDto {
    private String username;
    private String email;
    private String password;
    private String name;
    private String birthDay;
    private List<AppRole> role;

    public UserDto() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(String birthDay) {
        this.birthDay = birthDay;
    }

    public List<AppRole> getRole() {
        return role;
    }

    public void setRole(List<AppRole> role) {
        this.role = role;
    }
}
