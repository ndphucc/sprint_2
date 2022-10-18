package com.example.demo.service.impl;

import com.example.demo.dto.BillDetailDto;
import com.example.demo.dto_projection.IBillDetailDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Bill;
import com.example.demo.model.BillDetail;
import com.example.demo.repository.IBillDetailRepository;
import com.example.demo.repository.IBillRepository;
import com.example.demo.repository.IBookBillRepository;
import com.example.demo.repository.IUserRepository;
import com.example.demo.service.IBillDetailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<IBillDetailDto> getHistory(String username) {
        return billDetailRepository.getHistory(username);
    }
}
