package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.UserRole;
import org.intellij.lang.annotations.Identifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IUserRoleRepository extends JpaRepository<UserRole, Integer> {
    List<UserRole> findAllByAppUser(AppUser User);
    @Modifying
    @Query(value = "insert into user_role (role_id, user_id) value (:roleId, :userId)", nativeQuery = true)
    void save(@Param("roleId") Integer roleId, @Param("userId") Integer userId);
}
