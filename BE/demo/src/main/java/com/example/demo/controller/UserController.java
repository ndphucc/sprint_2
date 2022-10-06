package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.model.AppUser;
import com.example.demo.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {
    @Autowired
    private IUserService iUserService;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostMapping("create")
    public ResponseEntity<UserDto> create(@RequestBody UserDto userDto) {
        AppUser user = new AppUser();
        BeanUtils.copyProperties(userDto, user);
        user.setBirthDay(java.time.LocalDate.parse(userDto.getBirthDay()));
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        iUserService.save(user);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<AppUser> findByUsername(@RequestParam String username) {
        return new ResponseEntity<>(iUserService.findByUsername(username), HttpStatus.OK);
    }
}
