package com.example.demo.dto_projection;

import com.example.demo.dto.BookCartDto;
import com.example.demo.model.BookBill;

import java.time.LocalDate;
import java.util.List;

public interface IBillDetailDto {

    Integer getId();
    String getName();

    String getPhone();

    LocalDate getBillDate();

    String getAddress();

    double getTotal();

}
