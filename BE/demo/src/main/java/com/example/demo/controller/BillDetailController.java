package com.example.demo.controller;

import com.example.demo.dto.BillDetailDto;
import com.example.demo.dto.HistoryDto;
import com.example.demo.service.IBillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("api/billDetail")
public class BillDetailController {
    @Autowired
    private IBillDetailService billDetailService;

    @PostMapping("save")
    public ResponseEntity<BillDetailDto> saveCart(@RequestBody BillDetailDto billDetailDto) {
        billDetailService.save(billDetailDto);
        return new ResponseEntity<>(billDetailDto, HttpStatus.OK);
    }

    @GetMapping("history/{username}")
    public ResponseEntity<List<HistoryDto>> getHistory(@PathVariable String username) {
        List<HistoryDto> historyDtos = billDetailService.getHistory(username);
        return new ResponseEntity<>(billDetailService.getHistory(username), HttpStatus.OK);
    }
}
