package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.OrderDetail;
import com.code.BE.model.entity.Product;
import com.code.BE.model.mapper.OrderDetailMapper;
import com.code.BE.model.mapper.OrderMapper;
import com.code.BE.repository.OrderDetailRepository;
import com.code.BE.repository.OrderRepository;
import com.code.BE.repository.ProductRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Override
    public List<OrderResponse> findAll() {
        List<OrderResponse> orderResponseList = orderMapper.toResponseList(orderRepository.findAll());
        return returnOrderList(orderResponseList);
    }

    @Override
    public OrderResponse findById(int id) {
        Order order = orderRepository.findById(id);
        if (order != null) {
            List<OrderDetailResponse> orderDetailResponses = orderDetailMapper.toResponseList(order.getOrderDetails());
            OrderResponse orderResponse = orderMapper.toResponse(order);
            orderResponse.setOrderDetailResponses(orderDetailResponses);
            return orderResponse;
        }
        return null;
    }

    @Override
    public List<OrderResponse> findByStaffFullNameContaining(String name) {
        List<OrderResponse> orderResponseList = orderMapper.toResponseList(orderRepository.findByStaffFullNameContaining(name));
        return returnOrderList(orderResponseList);
    }

    @Override
    public List<OrderResponse> findByCustomerFullNameContaining(String name) {
        List<OrderResponse> orderResponseList = orderMapper.toResponseList(orderRepository.findByCustomerFullNameContaining(name));
        return returnOrderList(orderResponseList);
    }

    @Override
    public OrderResponse save(OrderRequest orderRequest) {
        Order order = orderMapper.toEntity(orderRequest);
        return saveOrderAndOrderDetail(order, orderRequest);
    }

    @Override
    public OrderResponse editById(int id, OrderRequest orderRequest) {
        Order order = orderRepository.findById(id);
        if (order != null) {
            if (!order.getOrderDetails().isEmpty()) {
                for (OrderDetail item : order.getOrderDetails()) {
                    orderDetailRepository.delete(item);
                }
                order.setOrderDetails(new ArrayList<>());
                orderRepository.saveAndFlush(order);
            }
            return saveOrderAndOrderDetail(order, orderRequest);
        }
        return null;
    }

    // reuse services
    @Override
    public List<OrderDetailResponse> findOrderDetailsByOrderId(int id) {
        return orderDetailMapper.toResponseList(orderRepository.findById(id).getOrderDetails());
    }

    @Override
    public List<OrderResponse> returnOrderList(List<OrderResponse> orderResponseList) {
        for (OrderResponse orderResponse : orderResponseList) {
            List<OrderDetailResponse> orderDetailResponses = findOrderDetailsByOrderId(orderResponse.getId());
            orderResponse.setOrderDetailResponses(orderDetailResponses);
        }

        return orderResponseList;
    }

    @Override
    public OrderResponse saveOrderAndOrderDetail(Order order, OrderRequest orderRequest) {
        Map<Integer, OrderDetail> productOrderDetailMap = new HashMap<>();
        double totalPrice = 0;

        for (OrderDetailRequest orderDetailRequest : orderRequest.getOrderDetailRequestList()) {
            int productId = orderDetailRequest.getProductId();
            int quantity = orderDetailRequest.getProductQuantity();
            Product product = productRepository.findById(productId);

            OrderDetail orderDetail = productOrderDetailMap.getOrDefault(productId, new OrderDetail());
            orderDetail.setProduct(product);
            orderDetail.setProductName(product.getName());
            orderDetail.setProductPrice(product.getSellPrice());
            orderDetail.setProductQuantity(orderDetail.getProductQuantity() + quantity);
            orderDetail.setTotalPrice(orderDetail.getProductPrice() * orderDetail.getProductQuantity());

            productOrderDetailMap.put(productId, orderDetail);
            totalPrice += orderDetail.getTotalPrice();
        }

        order.setStatus(orderRequest.getStatus().toUpperCase());
        order.setType(orderRequest.getType().toUpperCase());
        order.setCreateDate(new Date());
        order.setTotalPrice(totalPrice);
        order.setFinalPrice(totalPrice + totalPrice * orderRequest.getTax());
        order.setTotalBonusPoint(totalPrice / 1000);
        order.setRefundMoney((orderRequest.getCustomerGiveMoney() - order.getFinalPrice() > 0) ? (orderRequest.getCustomerGiveMoney() - order.getFinalPrice()) : 0);
        order.setPromotion(null);
        order.setStaff(userRepository.findById(orderRequest.getStaffId()));
        order.setCustomer(userRepository.findById(orderRequest.getCustomerId()));
        Order saveOrder = orderRepository.saveAndFlush(order);

        for (OrderDetail orderDetail : productOrderDetailMap.values()) {
            orderDetail.setOrder(saveOrder);
            orderDetailRepository.saveAndFlush(orderDetail);
        }

        OrderResponse orderResponse = orderMapper.toResponse(order);
        orderResponse.setOrderDetailResponses(orderDetailMapper.toResponseList(new ArrayList<>(productOrderDetailMap.values())));
        return orderResponse;
    }

}
