package com.example.demo.service.impl;

import com.example.demo.model.AppUser;
import com.example.demo.model.UserRole;
import com.example.demo.repository.IUserRepository;
import com.example.demo.repository.IUserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private IUserRepository appUserRepository;

    @Autowired
    private IUserRoleRepository userRoleRepository;

    /**
     * Create by SangNH
     * Date: 08/09/2022
     * It overrides the loadUserByUsername for fetching user details from the database using the username
     *
     * @param username
     * @return AppUser
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findAppUserByName(username);

        if (appUser == null) {
            throw new UsernameNotFoundException("AppUser " + username + " was not found in the database");
        }

        List<UserRole> userRoles = userRoleRepository.findAllByAppUser(appUser);

        List<GrantedAuthority> grantList = new ArrayList<>();

        if (userRoles != null) {
            for (UserRole item : userRoles) {
                GrantedAuthority authority = new SimpleGrantedAuthority(item.getAppRole().getName());
                grantList.add(authority);
            }
        }
        return new User(appUser.getName(), appUser.getPassword(), grantList);
    }
}
