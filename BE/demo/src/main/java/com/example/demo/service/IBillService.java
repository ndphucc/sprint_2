package com.example.demo.service;

import com.example.demo.model.Bill;

public interface IBillService {
    Bill findCart(String username);

    void save(Bill bill);
}
