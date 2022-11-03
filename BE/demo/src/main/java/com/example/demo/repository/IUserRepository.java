package com.example.demo.repository;


import com.example.demo.dto_projection.ICustomerDto;
import com.example.demo.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;
import java.util.List;


@Repository
@Transactional
public interface IUserRepository extends JpaRepository<AppUser, Integer> {

    @Query(value = "select id from app_user a where a.username = :username", nativeQuery = true)
    Integer findAppUserByUsername(@Param("username") String username);

    @Query(value = "select * from app_user a where a.username = :name", nativeQuery = true)
    AppUser findAppUserByName(@Param("name") String username);

    @Query(value = "select app_user.name, sum(bb.amount) as amountBuy from app_user join bill b on app_user.id = b.user_id join book_bill bb on b.id = bb.bill_id group by b.user_id order by amountBuy desc limit 10",nativeQuery = true)
    List<ICustomerDto> findTopCustomer();

}