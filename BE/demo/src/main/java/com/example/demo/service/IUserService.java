package com.example.demo.service;

import com.example.demo.dto_projection.ICustomerDto;
import com.example.demo.model.AppUser;

import java.util.List;

public interface IUserService {
    void save(AppUser user);

    AppUser findByUsername(String username);

    List<ICustomerDto> findTopCustomer();
}
