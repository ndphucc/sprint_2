package com.example.demo.dto;

public class BillDetailDto {
    private String phone;
    private String note;
    private String address;
    private String username;

    private BookCartDto bookCartDto;

    public BillDetailDto() {
    }

    public BookCartDto getBookCartDto() {
        return bookCartDto;
    }

    public void setBookCartDto(BookCartDto bookCartDto) {
        this.bookCartDto = bookCartDto;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
