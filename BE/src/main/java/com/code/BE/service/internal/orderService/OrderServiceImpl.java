package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.request.OrderRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.dto.response.OrderResponse;
import com.code.BE.model.entity.Customer;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.OrderDetail;
import com.code.BE.model.entity.Product;
import com.code.BE.model.mapper.CustomerMapper;
import com.code.BE.model.mapper.OrderDetailMapper;
import com.code.BE.model.mapper.OrderMapper;
import com.code.BE.repository.*;
import com.code.BE.util.PhoneNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
    private CustomerRepository customerRepository;

    @Autowired
    private PhoneNumberUtil phoneNumberUtil;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private PromotionRepository promotionRepository;

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
        order.setCreateDate(new Date());
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

        Customer customer = customerRepository.findByPhone(phoneNumberUtil.normalizePhoneNumber(orderRequest.getCustomerRequest().getPhone()));
        if (customer == null) {
            customer = customerMapper.toEntity(orderRequest.getCustomerRequest());
            customer.setCreateDate(new Date());
            customer.setUpdateDate(new Date());
            customer.setPhone(phoneNumberUtil.normalizePhoneNumber(orderRequest.getCustomerRequest().getPhone()));

            customer = customerRepository.saveAndFlush(customer);
        } else {
            customer.setFullName(orderRequest.getCustomerRequest().getFullName());
            customer.setEmail(orderRequest.getCustomerRequest().getEmail());
            customer.setAddress(orderRequest.getCustomerRequest().getAddress());
            customer.setBirthday(orderRequest.getCustomerRequest().getBirthday());
            customer.setStatus(orderRequest.getCustomerRequest().isStatus());
            customer.setUpdateDate(new Date());
            customer.setPhone(phoneNumberUtil.normalizePhoneNumber(orderRequest.getCustomerRequest().getPhone()));
            customer = customerRepository.saveAndFlush(customer);
        }

        order.setStatus(orderRequest.getStatus().toUpperCase());
        order.setType(orderRequest.getType().toUpperCase());
        order.setTotalPrice(totalPrice);
        order.setFinalPrice(totalPrice + totalPrice * orderRequest.getTax() -
                totalPrice * promotionRepository.findById(orderRequest.getPromotionId()).getDiscount());
        order.setTotalBonusPoint(totalPrice / 1000);
        order.setRefundMoney((orderRequest.getCustomerGiveMoney() - order.getFinalPrice() > 0) ? (orderRequest.getCustomerGiveMoney() - order.getFinalPrice()) : 0);
        order.setPromotion(promotionRepository.findById(orderRequest.getPromotionId()));
        order.setStaff(userRepository.findById(orderRequest.getStaffId()));
        order.setCustomer(customer);
        Order saveOrder = orderRepository.saveAndFlush(order);

        for (OrderDetail orderDetail : productOrderDetailMap.values()) {
            orderDetail.setOrder(saveOrder);
            orderDetailRepository.saveAndFlush(orderDetail);
        }
        OrderResponse orderResponse = orderMapper.toResponse(order);
        orderResponse.setCustomerResponse(customerMapper.toResponse(customer));
        orderResponse.setOrderDetailResponses(orderDetailMapper.toResponseList(new ArrayList<>(productOrderDetailMap.values())));
        return orderResponse;
    }

}
