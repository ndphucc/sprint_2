package com.example.demo.service;

import com.example.demo.model.BookBill;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface IBooKBillService {
    List<BookBill> findCart(String username);

    void deleteCartByUsername(String username);

    void save(BookBill bookBill);
}
