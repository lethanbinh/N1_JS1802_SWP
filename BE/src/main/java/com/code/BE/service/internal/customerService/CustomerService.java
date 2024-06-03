package com.code.BE.service.internal.customerService;

import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.model.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {
    List<CustomerResponse> findAll ();
    CustomerResponse findById (int id);
    List<CustomerResponse> findByFullNameContaining (String name);
    CustomerResponse findByPhone (String phone);
    CustomerResponse save (CustomerRequest customerRequest);
    CustomerResponse editById (int id, CustomerRequest customerRequest);
    boolean deleteById (int id);
}
