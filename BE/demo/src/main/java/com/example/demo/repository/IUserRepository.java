package com.example.demo.repository;


import com.example.demo.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;


@Repository
@Transactional
public interface IUserRepository extends JpaRepository<AppUser, Integer> {

    @Query(value = "select id from app_user a where a.username = :username", nativeQuery = true)
    Integer findAppUserByUsername(@Param("username") String username);

    @Query(value = "select * from app_user a where a.username = :name", nativeQuery = true)
    AppUser findAppUserByName(@Param("name") String username);

}