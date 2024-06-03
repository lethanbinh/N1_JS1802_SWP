package com.code.BE.service.internal.customerService;

import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.model.dto.response.CustomerResponse;
import com.code.BE.model.entity.Customer;
import com.code.BE.model.mapper.CustomerMapper;
import com.code.BE.repository.CustomerRepository;
import com.code.BE.util.PhoneNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private PhoneNumberUtil phoneNumberUtil;

    @Override
    public List<CustomerResponse> findAll() {
        return customerMapper.toResponseList(customerRepository.findAll());
    }

    @Override
    public CustomerResponse findById(int id) {
        return customerMapper.toResponse(customerRepository.findById(id));
    }

    @Override
    public List<CustomerResponse> findByFullNameContaining(String name) {
        return customerMapper.toResponseList(customerRepository.findByFullNameContaining(name));
    }

    @Override
    public CustomerResponse findByPhone(String phone) {
        return customerMapper.toResponse(customerRepository.findByPhone(phoneNumberUtil.normalizePhoneNumber(phone)));
    }

    @Override
    public CustomerResponse save(CustomerRequest customerRequest) {
        Customer customer = customerMapper.toEntity(customerRequest);
        customer.setCreateDate(new Date());
        customer.setUpdateDate(new Date());
        customer.setPhone(phoneNumberUtil.normalizePhoneNumber(customerRequest.getPhone()));

        return customerMapper.toResponse(customerRepository.saveAndFlush(customer));
    }

    @Override
    public CustomerResponse editById(int id, CustomerRequest customerRequest) {
        Customer customer = customerRepository.findById(id);
        if (customer != null) {
            customer.setFullName(customerRequest.getFullName());
            customer.setEmail(customerRequest.getEmail());
            customer.setAddress(customerRequest.getAddress());
            customer.setBirthday(customerRequest.getBirthday());
            customer.setStatus(customerRequest.isStatus());
            customer.setUpdateDate(new Date());
            customer.setPhone(phoneNumberUtil.normalizePhoneNumber(customerRequest.getPhone()));
            return customerMapper.toResponse(customerRepository.saveAndFlush(customer));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        Customer customer = customerRepository.findById(id);
        if (customer != null) {
            customer.setStatus(false);
            customerRepository.saveAndFlush(customer);
            return true;
        }
        return false;
    }
}
