package com.example.demo.repository;

import com.example.demo.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface IBillRepository extends JpaRepository<Bill, Integer> {
    @Query(value = "select bill.* from bill join app_user au on au.id = bill.user_id where username =:username && bill.cart = true;", nativeQuery = true)
    Bill findByCart(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "update bill set cart = false, bill_detail_id =:idDetail where id=:id", nativeQuery = true)
    void updateCart(@Param("id") int id, @Param("idDetail") int idDetail);

}
