package com.example.demo.model;

import javax.persistence.*;

@Entity
public class BookBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "book_id",referencedColumnName = "id")
    private Book book;
    @ManyToOne
    @JoinColumn(name = "bill_id",referencedColumnName = "id")
    private Bill bill;
    private int amount;

    public BookBill() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
