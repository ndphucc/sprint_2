package com.example.demo.service;

import com.example.demo.dto.BillDetailDto;
import com.example.demo.dto.HistoryDto;

import java.util.List;

public interface IBillDetailService {
    void save(BillDetailDto billDetail);

    List<HistoryDto> getHistory(String username);
}
