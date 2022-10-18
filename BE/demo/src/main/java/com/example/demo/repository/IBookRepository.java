package com.example.demo.repository;

import com.example.demo.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IBookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select * from book where type = :id or name like :search order by id desc", nativeQuery = true)
    Page<Book> findAll(@Param("id") int idType, @Param("search") String search, Pageable pageable);

    @Query(value = "select book.* from book join book_bill bb on book.id = bb.book_id join bill b on b.id = bb.bill_id where b.cart = false group by bb.book_id order by sum(bb.amount) desc limit 10;",nativeQuery = true)
    List<Book> findTop();
}
