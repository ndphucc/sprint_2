package com.example.demo.dto;

import java.util.List;

public class CartDto {
    private String username;
    private List<BookCartDto> bookCart;

    public CartDto() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<BookCartDto> getBookCart() {
        return bookCart;
    }

    public void setBookCart(List<BookCartDto> bookCart) {
        this.bookCart = bookCart;
    }
}
