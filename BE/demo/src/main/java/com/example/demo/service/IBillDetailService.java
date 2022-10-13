package com.example.demo.service;

import com.example.demo.dto.BillDetailDto;
import com.example.demo.dto_projection.IBillDetailDto;

import java.util.List;

public interface IBillDetailService {
    void save(BillDetailDto billDetail);

    List<IBillDetailDto> getHistory(String username);
}
