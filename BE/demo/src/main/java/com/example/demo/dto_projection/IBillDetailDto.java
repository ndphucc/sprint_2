package com.example.demo.dto_projection;

import java.time.LocalDate;

public interface IBillDetailDto {
    String getName();

    String getPhone();

    LocalDate getBillDate();

    String getAddress();

    double getTotal();
}
