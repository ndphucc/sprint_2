package com.example.demo.service.impl;

import com.example.demo.dto.BillDetailDto;
import com.example.demo.dto.BookCartDto;
import com.example.demo.dto.HistoryDto;
import com.example.demo.dto_projection.IBillDetailDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Bill;
import com.example.demo.model.BillDetail;
import com.example.demo.model.BookBill;
import com.example.demo.repository.IBillDetailRepository;
import com.example.demo.repository.IBillRepository;
import com.example.demo.repository.IBookBillRepository;
import com.example.demo.repository.IUserRepository;
import com.example.demo.service.IBillDetailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class BillDetailService implements IBillDetailService {
    @Autowired
    private IBillRepository billRepository;
    @Autowired
    private IBillDetailRepository billDetailRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IBookBillRepository bookBillRepository;

    @Override
    public void save(BillDetailDto billDetail) {
        Bill bill = new Bill();
        if (billDetail.getBookCartDto() == null) {
            bill = billRepository.findByCart(billDetail.getUsername());
        } else {
            AppUser appUser = userRepository.findAppUserByName(billDetail.getUsername());
            bill.setCart(false);
            bill.setUser(appUser);
            billRepository.save(bill);
            bookBillRepository.save(billDetail.getBookCartDto().getAmount(), billRepository.findMaxIdBill(), billDetail.getBookCartDto().getBook().getId());
            bill = billRepository.findById(billRepository.findMaxIdBill()).get();
        }
        BillDetail temp = new BillDetail();
        BeanUtils.copyProperties(billDetail, temp);
        temp.setBill(bill);
        temp.setBillDate(java.time.LocalDate.now());
        billDetailRepository.save(temp);
        int idDetail = billDetailRepository.getMaxId();
        billRepository.updateCart(bill.getId(), idDetail);
    }

    @Override
    public List<HistoryDto> getHistory(String username) {
        List<HistoryDto> histories = new LinkedList<>();
        List<IBillDetailDto> iBillDetailDtoList = billDetailRepository.getHistory(username);
        for (IBillDetailDto item: iBillDetailDtoList) {
            int id = item.getId();
            HistoryDto historyDto = new HistoryDto();
            historyDto.setName(item.getName());
            historyDto.setPhone(item.getPhone());
            historyDto.setBillDate(item.getBillDate());
            historyDto.setAddress(item.getAddress());
            historyDto.setTotal(item.getTotal());
            List<BookBill> bookBillList = bookBillRepository.findBookBillDetail(id);
            List<BookCartDto> bookCartDtoList = new LinkedList<>();
            for (BookBill bookBill: bookBillList) {
                BookCartDto bookCartDto = new BookCartDto();
                bookCartDto.setBook(bookBill.getBook());
                bookCartDto.setAmount(bookBill.getAmount());
                bookCartDtoList.add(bookCartDto);
            }
            historyDto.setBookBillList(bookCartDtoList);
            histories.add(historyDto);
        }
        return histories;
    }
}
