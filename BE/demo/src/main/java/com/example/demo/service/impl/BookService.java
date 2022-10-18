package com.example.demo.service.impl;

import com.example.demo.model.Book;
import com.example.demo.repository.IBookRepository;
import com.example.demo.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepository bookRepository;

    @Override
    public Page<Book> findAll(Pageable pageable, int idType, String search) {
        return bookRepository.findAll(idType, "%" + search + "%", pageable);
    }

    @Override
    public Book findById(Integer id) {
        return bookRepository.findById(id).get();
    }

    @Override
    public List<Book> findTop() {
        return bookRepository.findTop();
    }
}
