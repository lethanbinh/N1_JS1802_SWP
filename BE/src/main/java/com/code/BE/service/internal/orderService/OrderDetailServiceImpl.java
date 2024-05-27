package com.code.BE.service.internal.orderService;

import com.code.BE.model.dto.request.OrderDetailRequest;
import com.code.BE.model.dto.response.OrderDetailResponse;
import com.code.BE.model.entity.Order;
import com.code.BE.model.entity.OrderDetail;
import com.code.BE.model.entity.Product;
import com.code.BE.model.mapper.OrderDetailMapper;
import com.code.BE.repository.OrderDetailRepository;
import com.code.BE.repository.OrderRepository;
import com.code.BE.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Override
    public List<OrderDetailResponse> findAll() {
        return orderDetailMapper.toResponseList(orderDetailRepository.findAll());
    }

    @Override
    public OrderDetailResponse findById(int id) {
        return orderDetailMapper.toResponse(orderDetailRepository.findById(id));
    }

    @Override
    public OrderDetailResponse save(OrderDetailRequest orderDetailRequest) {
        OrderDetail orderDetail = new OrderDetail();
        Product product = productRepository.findById(orderDetailRequest.getProductId());
        Order order = orderRepository.findById(orderDetailRequest.getOrderId());

        orderDetail.setProductName(product.getName());
        orderDetail.setProductPrice(product.getSellPrice());
        orderDetail.setProductQuantity(orderDetailRequest.getQuantity());
        orderDetail.setTotalPrice(orderDetail.getProductPrice() * orderDetail.getProductQuantity());
        orderDetail.setProduct(product);
        orderDetail.setOrder(order);

        return orderDetailMapper.toResponse(orderDetailRepository.saveAndFlush(orderDetail));
    }

    @Override
    public OrderDetailResponse editById(int id, OrderDetailRequest orderDetailRequest) {
        OrderDetail orderDetail = orderDetailRepository.findById(id);
        if (orderDetail != null) {
            if (orderDetailRequest.getQuantity() <= 0) {
                deleteById(id);
                return null;
            }

            Product product = productRepository.findById(orderDetailRequest.getProductId());
            Order order = orderRepository.findById(orderDetailRequest.getOrderId());

            orderDetail.setProductName(product.getName());
            orderDetail.setProductPrice(product.getSellPrice());
            orderDetail.setProductQuantity(orderDetailRequest.getQuantity());
            orderDetail.setTotalPrice(orderDetail.getProductPrice() * orderDetail.getProductQuantity());
            orderDetail.setProduct(product);
            orderDetail.setOrder(order);

            return orderDetailMapper.toResponse(orderDetailRepository.saveAndFlush(orderDetail));
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        if (orderDetailRepository.findById(id) != null) {
            orderDetailRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
