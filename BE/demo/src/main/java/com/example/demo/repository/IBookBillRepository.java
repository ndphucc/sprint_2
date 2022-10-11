package com.example.demo.repository;

import com.example.demo.model.BookBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IBookBillRepository extends JpaRepository<BookBill, Integer> {
    @Query(value = "select bb.* from  app_user join bill b on app_user.id = b.user_id left join book_bill bb on b.id = bb.bill_id join book b2 on bb.book_id = b2.id where app_user.username = :username and b.cart;", nativeQuery = true)
    List<BookBill> findCart(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "delete from book_bill where bill_id in (select bill.id from bill join app_user au on au.id = bill.user_id where username=:username);", nativeQuery = true)
    void deleteCartByUsername(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "insert into book_bill(amount, bill_id, book_id) value (:amount, :bill_id, :book_id);", nativeQuery = true)
    void save(@Param("amount") int amount, @Param("bill_id") int billId, @Param("book_id") int bookId);
}
