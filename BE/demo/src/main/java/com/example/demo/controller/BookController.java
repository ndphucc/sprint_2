package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/book")
@CrossOrigin
public class BookController {
    @Autowired
    private IBookService iBookService;
    @GetMapping("list")
    public ResponseEntity<Page<Book>> getAll(@PageableDefault(15) Pageable pageable, @RequestParam Integer idType, @RequestParam String search){
        return new ResponseEntity<>(iBookService.findAll(pageable,idType,search), HttpStatus.OK);
    }
}
