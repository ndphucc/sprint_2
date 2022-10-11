package com.example.demo.service.impl;

import com.example.demo.model.Bill;
import com.example.demo.repository.IBillRepository;
import com.example.demo.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillService implements IBillService {
    @Autowired
    private IBillRepository iBillRepository;

    @Override
    public Bill findCart(String username) {
        return iBillRepository.findByCart(username);
    }

    @Override
    public void save(Bill bill) {
        iBillRepository.save(bill);
    }
}
