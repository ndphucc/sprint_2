package com.example.demo.service;

import com.example.demo.model.TypeBook;

import java.util.List;

public interface ITypeBookService {
    List<TypeBook> findAll();

    TypeBook findById(int id);
}
