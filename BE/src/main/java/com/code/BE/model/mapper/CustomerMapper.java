package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.model.dto.response.CustomerResponse;
import com.code.BE.model.entity.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    // Map Entity to Response
    CustomerResponse toResponse(Customer customer);
    List<CustomerResponse> toResponseList(List<Customer> customerList);
    // Map Request to Entity
    Customer toEntity(CustomerRequest customerRequest);
    List<Customer> toEntityList(List<CustomerRequest> customerRequestList);
}
