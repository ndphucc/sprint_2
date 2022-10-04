package com.example.demo.service.impl;

import com.example.demo.model.AppRole;
import com.example.demo.model.AppUser;
import com.example.demo.model.UserRole;
import com.example.demo.repository.IUserRepository;
import com.example.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Override
    public void save(AppUser user) {
        UserRole userRole = new UserRole(user,new AppRole(1));
        List<UserRole> userRoles = new LinkedList<>();
        userRoles.add(userRole);
        user.setUserRoles(userRoles);
        iUserRepository.save(user);
    }
}
