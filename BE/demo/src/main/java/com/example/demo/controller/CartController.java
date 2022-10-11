package com.example.demo.controller;

import com.example.demo.dto.CartDto;
import com.example.demo.model.BookBill;
import com.example.demo.service.impl.BookBillService;
import com.example.demo.service.impl.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private BookBillService bookBillService;
    @Autowired
    private CartService cartService;

    @GetMapping("{username}")
    public ResponseEntity<List<BookBill>> findCart(@PathVariable String username) {
        return new ResponseEntity<>(bookBillService.findCart(username), HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<CartDto> saveCart(@RequestBody CartDto cart) {
        cartService.save(cart);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
}
