package com.example.demo.service.impl;

import com.example.demo.model.BookBill;
import com.example.demo.repository.IBookBillRepository;
import com.example.demo.service.IBooKBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookBillService implements IBooKBillService {
    @Autowired
    private IBookBillRepository iBookBillRepository;

    @Override
    public List<BookBill> findCart(String username) {
        return iBookBillRepository.findCart(username);
    }

    @Override
    public void deleteCartByUsername(String username) {
        iBookBillRepository.deleteCartByUsername(username);
    }

    @Override
    public void save(BookBill bookBill) {
        iBookBillRepository.save(bookBill);
    }


}
