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

import java.util.List;

@RestController
@RequestMapping("api/book")
@CrossOrigin
public class BookController {
    @Autowired
    private IBookService iBookService;

    @GetMapping("list")
    public ResponseEntity<Page<Book>> getAll(@PageableDefault(15) Pageable pageable, @RequestParam(defaultValue = "0") Integer idType, @RequestParam(defaultValue = "#") String search) {
        if (idType == 0 && search.equals("null")) {
            search = "";
        }
        return new ResponseEntity<>(iBookService.findAll(pageable, idType, search), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> findById(@PathVariable Integer id) {
        return new ResponseEntity<>(iBookService.findById(id), HttpStatus.OK);
    }
    @GetMapping("/top")
    public ResponseEntity<List<Book>> getTop() {
        return new ResponseEntity<>(iBookService.findTop(), HttpStatus.OK);
    }
}
