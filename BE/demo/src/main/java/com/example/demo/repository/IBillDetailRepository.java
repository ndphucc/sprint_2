package com.example.demo.repository;

import com.example.demo.dto_projection.IBillDetailDto;
import com.example.demo.model.BillDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IBillDetailRepository extends JpaRepository<BillDetail, Integer> {
    @Query(value = "select max(id) as id from bill_detail", nativeQuery = true)
    Integer getMaxId();

    @Query(value = "select b.id, app_user.name, bd.address, bd.bill_date as billDate, bd.phone, sum(b2.price * bb.amount) as total\n" +
            "from app_user\n" +
            "         left join bill b on app_user.id = b.user_id\n" +
            "         left join book_bill bb on b.id = bb.bill_id\n" +
            "         left join book b2 on bb.book_id = b2.id\n" +
            "         join bill_detail bd on bd.id = b.bill_detail_id\n" +
            "where b.cart = false\n" +
            "  and username = :username\n" +
            "group by bb.bill_id order by bd.bill_date desc,bd.id desc;", nativeQuery = true)
    List<IBillDetailDto> getHistory(@Param("username") String username);
}
