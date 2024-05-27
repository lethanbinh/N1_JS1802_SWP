package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.OrderDetail;
import com.code.BE.model.entity.User;
import com.code.BE.model.mapper.OrderMapper;
import com.code.BE.repository.OrderDetailRepository;
import com.code.BE.repository.OrderRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderDetailImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderResponse> findAll() {
        return orderMapper.toResponseList(orderRepository.findAll());
    }

    @Override
    public OrderResponse findById(int id) {
        return orderMapper.toResponse(orderRepository.findById(id));
    }

    @Override
    public OrderResponse save(OrderRequest orderRequest) {
        Order order = orderMapper.toEntity(orderRequest);
        order.setCreateDate(new Date());
        order.setPromotion(null);
        order.setStaff(userRepository.findById(orderRequest.getStaffId()));
        order.setCustomer(userRepository.findById(orderRequest.getCustomerId()));
        return orderMapper.toResponse(orderRepository.saveAndFlush(order));
    }

    @Override
    public OrderResponse editById(int id, OrderRequest orderRequest) {
        Order order = orderRepository.findById(id);
        User staff = userRepository.findById(orderRequest.getStaffId());
        User customer = userRepository.findById(orderRequest.getCustomerId());
        double totalPrice = 0;
        for (OrderDetail orderDetail : orderDetailRepository.findByOrderId(id)) {
            totalPrice += orderDetail.getTotalPrice();
        }

        if (order != null) {
            order.setName(orderRequest.getName());
            order.setDescription(orderRequest.getDescription());
            order.setStatus(orderRequest.getStatus());
            order.setType(orderRequest.getType());
            order.setAddress(orderRequest.getAddress());
            order.setTotalPrice(totalPrice);
            order.setTax(orderRequest.getTax());
            order.setFinalPrice(totalPrice - totalPrice*orderRequest.getTax());
            order.setTotalBonusPoint(orderRequest.getTotalBonusPoint());
            order.setCustomerGiveMoney(orderRequest.getCustomerGiveMoney());
            order.setRefundMoney(orderRequest.getRefundMoney());
            order.setPromotion(null);
            order.setStaff(staff);
            order.setCustomer(customer);

            return orderMapper.toResponse(orderRepository.saveAndFlush(order));
        }

        return null;
    }
}
