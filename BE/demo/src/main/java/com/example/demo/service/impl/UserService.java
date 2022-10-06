package com.example.demo.service.impl;

import com.example.demo.model.AppRole;
import com.example.demo.model.AppUser;
import com.example.demo.model.UserRole;
import com.example.demo.repository.IUserRepository;
import com.example.demo.repository.IUserRoleRepository;
import com.example.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IUserRoleRepository iUserRoleRepository;

    @Override
    public void save(AppUser user) {
        iUserRepository.save(user);
        Integer idUser = iUserRepository.findAppUserByUsername(user.getUsername());
        iUserRoleRepository.save(2, idUser);
    }

    @Override
    public AppUser findByUsername(String username) {
        return iUserRepository.findAppUserByName(username);
    }

}
