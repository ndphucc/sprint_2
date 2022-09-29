package com.example.demo.service.impl;

import com.example.demo.model.TypeBook;
import com.example.demo.repository.ITypeBookRepository;
import com.example.demo.service.ITypeBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TypeBookService implements ITypeBookService {
    @Autowired
    private ITypeBookRepository typeBookRepository;
    @Override
    public List<TypeBook> findAll() {
        return typeBookRepository.findAll();
    }

    @Override
    public TypeBook findById(int id) {
        return typeBookRepository.findById(id).get();
    }
}
