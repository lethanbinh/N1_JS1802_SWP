package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.CustomerRequest;
import com.code.BE.model.dto.response.CustomerResponse;
import com.code.BE.model.entity.Customer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-17T10:41:50+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public CustomerResponse toResponse(Customer customer) {
        if ( customer == null ) {
            return null;
        }

        CustomerResponse customerResponse = new CustomerResponse();

        customerResponse.setId( customer.getId() );
        customerResponse.setFullName( customer.getFullName() );
        customerResponse.setPhone( customer.getPhone() );
        customerResponse.setEmail( customer.getEmail() );
        customerResponse.setAddress( customer.getAddress() );
        customerResponse.setCreateDate( customer.getCreateDate() );
        customerResponse.setUpdateDate( customer.getUpdateDate() );
        customerResponse.setBirthday( customer.getBirthday() );
        customerResponse.setStatus( customer.isStatus() );

        return customerResponse;
    }

    @Override
    public List<CustomerResponse> toResponseList(List<Customer> customerList) {
        if ( customerList == null ) {
            return null;
        }

        List<CustomerResponse> list = new ArrayList<CustomerResponse>( customerList.size() );
        for ( Customer customer : customerList ) {
            list.add( toResponse( customer ) );
        }

        return list;
    }

    @Override
    public Customer toEntity(CustomerRequest customerRequest) {
        if ( customerRequest == null ) {
            return null;
        }

        Customer customer = new Customer();

        customer.setFullName( customerRequest.getFullName() );
        customer.setPhone( customerRequest.getPhone() );
        customer.setEmail( customerRequest.getEmail() );
        customer.setAddress( customerRequest.getAddress() );
        customer.setBirthday( customerRequest.getBirthday() );
        customer.setStatus( customerRequest.isStatus() );

        return customer;
    }

    @Override
    public List<Customer> toEntityList(List<CustomerRequest> customerRequestList) {
        if ( customerRequestList == null ) {
            return null;
        }

        List<Customer> list = new ArrayList<Customer>( customerRequestList.size() );
        for ( CustomerRequest customerRequest : customerRequestList ) {
            list.add( toEntity( customerRequest ) );
        }

        return list;
    }
}
