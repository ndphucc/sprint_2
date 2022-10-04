package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IUserRoleRepository extends JpaRepository<UserRole, Integer> {
    List<UserRole> findAllByAppUser(AppUser User);
}
