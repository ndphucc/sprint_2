package com.example.demo.dto;

import com.example.demo.model.Book;

public class BookCartDto {
    private int amount;
    private Book book;

    public BookCartDto() {
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
