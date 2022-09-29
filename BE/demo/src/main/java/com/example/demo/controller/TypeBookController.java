package com.example.demo.controller;

import com.example.demo.model.TypeBook;
import com.example.demo.service.ITypeBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/typeBook")
@CrossOrigin
public class TypeBookController {
    @Autowired
    private ITypeBookService typeBookService;
    @GetMapping("list")
    public ResponseEntity<List<TypeBook>> getAll(){
        return new ResponseEntity<>(typeBookService.findAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<TypeBook> findById(@PathVariable("id") int id){
        return new ResponseEntity<>(typeBookService.findById(id), HttpStatus.OK);
    }
}
