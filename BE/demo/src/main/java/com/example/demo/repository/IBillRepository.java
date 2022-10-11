package com.example.demo.repository;

import com.example.demo.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IBillRepository extends JpaRepository<Bill, Integer> {
    @Query(value = "select bill.* from bill join app_user au on au.id = bill.user_id where username =:username && bill.cart = true;", nativeQuery = true)
    Bill findByCart(@Param("username") String username);


}
