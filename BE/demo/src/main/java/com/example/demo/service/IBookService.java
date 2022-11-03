package com.example.demo.service;

import com.example.demo.dto_projection.IBookDto;
import com.example.demo.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookService {
    Page<Book> findAll(Pageable pageable, int idType, String search);

    Book findById(Integer id);

    List<Book> findTop();

    void save(Book book);

    void delete(Integer id);

    List<IBookDto> findTopByWeek();

    List<IBookDto> findTopByMonth();

    List<IBookDto> findTopByYear();
}
