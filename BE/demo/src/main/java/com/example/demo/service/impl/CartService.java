package com.example.demo.service.impl;

import com.example.demo.dto.BookCartDto;
import com.example.demo.dto.CartDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Bill;
import com.example.demo.model.BookBill;
import com.example.demo.repository.IBookBillRepository;
import com.example.demo.repository.IUserRepository;
import com.example.demo.service.IBillService;
import com.example.demo.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    @Autowired
    private IBillService billService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IBookBillRepository bookBillRepository;

    @Override
    public void save(CartDto cartDto) {
        Bill bill = billService.findCart(cartDto.getUsername());
        if (bill == null) {
            bill = new Bill();
            AppUser appUser = userRepository.findAppUserByName(cartDto.getUsername());
            bill.setCart(true);
            bill.setUser(appUser);
            billService.save(bill);
            bill = billService.findCart(cartDto.getUsername());
        }
        bookBillRepository.deleteCartByUsername(cartDto.getUsername());
        for (BookCartDto item : cartDto.getBookCart()) {
            bookBillRepository.save(item.getAmount(), bill.getId(), item.getBook().getId());
        }
    }
}
