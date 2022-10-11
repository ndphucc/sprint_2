package com.example.demo.controller;
import com.example.demo.dto.BillDetailDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/book")
public class BillDetailController {
    @PostMapping("/save")
    public ResponseEntity<BillDetailDto> saveCart(@RequestBody BillDetailDto billDetailDto) {
        return new ResponseEntity<>(billDetailDto, HttpStatus.OK);
    }
}
