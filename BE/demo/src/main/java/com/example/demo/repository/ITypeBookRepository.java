package com.example.demo.repository;

import com.example.demo.model.TypeBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITypeBookRepository extends JpaRepository<TypeBook,Integer> {
}
