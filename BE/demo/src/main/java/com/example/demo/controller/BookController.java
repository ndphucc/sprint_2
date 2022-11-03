package com.example.demo.controller;

import com.example.demo.dto_projection.IBookDto;
import com.example.demo.dto_projection.ICustomerDto;
import com.example.demo.model.Book;
import com.example.demo.service.IBookService;
import com.example.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("api/book")
@CrossOrigin
public class BookController {
    @Autowired
    private IBookService iBookService;

    @Autowired
    private IUserService iUserService;

    @GetMapping("list")
    public ResponseEntity<Page<Book>> getAll(@PageableDefault(15) Pageable pageable, @RequestParam(defaultValue = "0") Integer idType, @RequestParam(defaultValue = "#") String search) {
        if (idType == 0 && search.equals("null")) {
            search = "";
        }
        return new ResponseEntity<>(iBookService.findAll(pageable, idType, search), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> findById(@PathVariable Integer id) {
        return new ResponseEntity<>(iBookService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/top")
    public ResponseEntity<List<Book>> getTop() {
        return new ResponseEntity<>(iBookService.findTop(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Book> save(@RequestBody Book book) {
        iBookService.save(book);
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Book> delete(@PathVariable Integer id) {
        iBookService.delete(id);
        return new ResponseEntity<>(new Book(), HttpStatus.OK);
    }

    @GetMapping("/statistical/book/{type}")
    public ResponseEntity<List<IBookDto>> statisticalBook(@PathVariable("type") String type) {
        List<IBookDto> iBookDtoList = new LinkedList<>();
        if (type.equals("week")) {
            iBookDtoList = iBookService.findTopByWeek();
        } else if (type.equals("month")) {
            iBookDtoList = iBookService.findTopByMonth();
        } else if (type.equals("year")) {
            iBookDtoList = iBookService.findTopByYear();
        }
        return new ResponseEntity<>(iBookDtoList, HttpStatus.OK);
    }
    @GetMapping("statistical/customer")
    public ResponseEntity<List<ICustomerDto>> statisticalCustomer() {
        return new ResponseEntity<>(iUserService.findTopCustomer(), HttpStatus.OK);
    }
}
