package com.example.demo.repository;

import com.example.demo.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IBookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select * from book where type = :id or name like :search",nativeQuery = true)
    Page<Book> findAll(@Param("id") int idType,@Param("search") String search, Pageable pageable);
}
