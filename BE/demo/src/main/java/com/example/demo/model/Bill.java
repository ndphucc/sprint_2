package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String code;
    private boolean cart;
    private LocalDate billDate;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;
    @OneToMany(mappedBy = "id")
    @JsonIgnore
    private Set<BookBill> bookBills;
    @OneToOne
    @JoinColumn(name = "bill_detail_id", referencedColumnName = "id")
    private BillDetail billDetail;
    public Bill() {
    }

    public BillDetail getBillDetail() {
        return billDetail;
    }

    public void setBillDetail(BillDetail billDetail) {
        this.billDetail = billDetail;
    }

    public boolean isCart() {
        return cart;
    }

    public void setCart(boolean cart) {
        this.cart = cart;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Set<BookBill> getBookBills() {
        return bookBills;
    }

    public void setBookBills(Set<BookBill> bookBills) {
        this.bookBills = bookBills;
    }
}
