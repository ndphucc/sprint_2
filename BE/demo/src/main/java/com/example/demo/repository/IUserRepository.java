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

  @Query(value = "select * from user a where a.name = :name", nativeQuery = true)
  AppUser findAppUserByName(@Param("name") String username);
}