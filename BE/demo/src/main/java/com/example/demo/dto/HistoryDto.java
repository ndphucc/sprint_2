package com.example.demo.dto;

import com.example.demo.model.BookBill;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.List;

public class HistoryDto {

    List<BookCartDto> bookCartDtoList;

    String name;

    String phone;

    LocalDate billDate;

    String address;

    double total;

    public HistoryDto() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<BookCartDto> getBookBillList() {
        return bookCartDtoList;
    }

    public void setBookBillList(List<BookCartDto> bookCartDtoList) {
        this.bookCartDtoList = bookCartDtoList;
    }


}
