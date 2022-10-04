package com.example.demo.dto;

import com.example.demo.model.AppRole;

import java.time.LocalDate;
import java.util.List;

public class UserDto {
    private String userName;
    private String email;
    private String password;
    private String name;
    private LocalDate birthDay;
    private List<AppRole> role;

    public UserDto() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public List<AppRole> getRole() {
        return role;
    }

    public void setRole(List<AppRole> role) {
        this.role = role;
    }
}
