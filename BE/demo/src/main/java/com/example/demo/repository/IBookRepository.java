package com.example.demo.repository;

import com.example.demo.dto_projection.IBookDto;
import com.example.demo.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IBookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select * from book where (type = :id or name like :search) and status_delete = true order by id desc", nativeQuery = true)
    Page<Book> findAll(@Param("id") int idType, @Param("search") String search, Pageable pageable);

    @Query(value = "select book.* from book join book_bill bb on book.id = bb.book_id join bill b on b.id = bb.bill_id where b.cart = false group by bb.book_id order by sum(bb.amount) desc limit 10;", nativeQuery = true)
    List<Book> findTop();

    @Query(value = "select Max(code) from book", nativeQuery = true)
    String getMaxCode();

    @Transactional
    @Modifying
    @Query(value = "update book set status_delete = false where id=:id", nativeQuery = true)
    void delete(@Param("id") Integer id);

    @Query(value = "select book.name,sum(bb.amount) as amountBuy from book join book_bill bb on book.id = bb.book_id join bill b on b.id = bb.bill_id join bill_detail bd on bd.id = b.bill_detail_id where DAYOFWEEK(now()) = dayofweek(bd.bill_date) group by bb.book_id order by amountBuy desc limit 10", nativeQuery = true)
    List<IBookDto> findTopByWeek();

    @Query(value = "select book.name,sum(bb.amount) as amountBuy from book join book_bill bb on book.id = bb.book_id join bill b on b.id = bb.bill_id join bill_detail bd on bd.id = b.bill_detail_id where month(now()) = month(bd.bill_date) group by bb.book_id order by amountBuy desc limit 10", nativeQuery = true)
    List<IBookDto> findTopByMonth();

    @Query(value = "select book.name,sum(bb.amount) as amountBuy from book join book_bill bb on book.id = bb.book_id join bill b on b.id = bb.bill_id join bill_detail bd on bd.id = b.bill_detail_id where year(now()) = year(bd.bill_date) group by bb.book_id order by amountBuy desc limit 10", nativeQuery = true)
    List<IBookDto> findTopByYear();
}
