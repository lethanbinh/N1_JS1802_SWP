package com.code.BE.service.internal.messageService;

import com.code.BE.model.dto.request.MessageRequest;
import com.code.BE.model.dto.response.MessageResponse;
import com.code.BE.model.entity.Message;
import com.code.BE.model.mapper.MessageMapper;
import com.code.BE.repository.MessageRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private UserRepository userRepository;

    @Override
    public MessageResponse save(MessageRequest messageRequest) {
        Message message = messageMapper.toEntity(messageRequest);
        message.setDate(new Date());
        message.setDeleted(false);
        message.setSender(userRepository.findById(messageRequest.getSenderId()));
        message.setReceiver(userRepository.findById(messageRequest.getReceiverId()));
        return messageMapper.toResponse(messageRepository.saveAndFlush(message));
    }

    @Override
    public void deleteById(int id) {
        Message message = messageRepository.findById(id);
        message.setDeleted(true);
    }

    @Override
    public MessageResponse findById(int id) {
        return messageMapper.toResponse(messageRepository.findById(id));
    }

    @Override
    public List<MessageResponse> getPrivateMessage(int senderId, int receiverId) {
        return messageMapper.toResponseList(messageRepository.getPrivateMessage(senderId, receiverId));
    }

    @Override
    public List<MessageResponse> getPublicMessage() {
        return messageMapper.toResponseList(messageRepository.getPublicMessage());
    }
}
