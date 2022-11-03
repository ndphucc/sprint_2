package com.example.demo.service.impl;

import com.example.demo.dto_projection.IBookDto;
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

    @Override
    public void save(Book book) {
        String code = bookRepository.getMaxCode();
        int temp = Integer.parseInt(code.substring(2));
        temp += 1;
        code = "B" + String.format("%05d", temp);
        book.setCode(code);
        bookRepository.save(book);
    }

    @Override
    public void delete(Integer id) {
        bookRepository.delete(id);
    }

    @Override
    public List<IBookDto> findTopByWeek() {
        return bookRepository.findTopByWeek();
    }

    @Override
    public List<IBookDto> findTopByMonth() {
        return bookRepository.findTopByMonth();
    }

    @Override
    public List<IBookDto> findTopByYear() {
        return bookRepository.findTopByYear();
    }
}
