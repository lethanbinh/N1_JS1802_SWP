package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Customer;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.Promotion;
import com.code.BE.model.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-10T17:02:17+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderResponse toResponse(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponse orderResponse = new OrderResponse();

        orderResponse.setPromotionId( orderPromotionId( order ) );
        orderResponse.setStaffId( orderStaffId( order ) );
        orderResponse.setCustomerId( orderCustomerId( order ) );
        orderResponse.setId( order.getId() );
        orderResponse.setDescription( order.getDescription() );
        orderResponse.setStatus( order.getStatus() );
        orderResponse.setType( order.getType() );
        orderResponse.setCreateDate( order.getCreateDate() );
        orderResponse.setAddress( order.getAddress() );
        orderResponse.setTotalPrice( order.getTotalPrice() );
        orderResponse.setTax( order.getTax() );
        orderResponse.setTotalBonusPoint( order.getTotalBonusPoint() );
        orderResponse.setCustomerGiveMoney( order.getCustomerGiveMoney() );
        orderResponse.setRefundMoney( order.getRefundMoney() );
        orderResponse.setSendMoneyMethod( order.getSendMoneyMethod() );

        return orderResponse;
    }

    @Override
    public List<OrderResponse> toResponseList(List<Order> orderList) {
        if ( orderList == null ) {
            return null;
        }

        List<OrderResponse> list = new ArrayList<OrderResponse>( orderList.size() );
        for ( Order order : orderList ) {
            list.add( toResponse( order ) );
        }

        return list;
    }

    @Override
    public Order toEntity(OrderRequest orderRequest) {
        if ( orderRequest == null ) {
            return null;
        }

        Order order = new Order();

        order.setDescription( orderRequest.getDescription() );
        order.setStatus( orderRequest.getStatus() );
        order.setType( orderRequest.getType() );
        order.setAddress( orderRequest.getAddress() );
        order.setTotalPrice( orderRequest.getTotalPrice() );
        order.setTax( orderRequest.getTax() );
        order.setTotalBonusPoint( orderRequest.getTotalBonusPoint() );
        order.setCustomerGiveMoney( orderRequest.getCustomerGiveMoney() );
        order.setRefundMoney( orderRequest.getRefundMoney() );
        order.setSendMoneyMethod( orderRequest.getSendMoneyMethod() );

        return order;
    }

    @Override
    public List<Order> toEntityList(List<OrderRequest> orderRequestList) {
        if ( orderRequestList == null ) {
            return null;
        }

        List<Order> list = new ArrayList<Order>( orderRequestList.size() );
        for ( OrderRequest orderRequest : orderRequestList ) {
            list.add( toEntity( orderRequest ) );
        }

        return list;
    }

    private int orderPromotionId(Order order) {
        if ( order == null ) {
            return 0;
        }
        Promotion promotion = order.getPromotion();
        if ( promotion == null ) {
            return 0;
        }
        int id = promotion.getId();
        return id;
    }

    private int orderStaffId(Order order) {
        if ( order == null ) {
            return 0;
        }
        User staff = order.getStaff();
        if ( staff == null ) {
            return 0;
        }
        int id = staff.getId();
        return id;
    }

    private int orderCustomerId(Order order) {
        if ( order == null ) {
            return 0;
        }
        Customer customer = order.getCustomer();
        if ( customer == null ) {
            return 0;
        }
        int id = customer.getId();
        return id;
    }
}
