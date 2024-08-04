package com.code.BE.controller;

import com.code.BE.exception.ApplicationException;
import com.code.BE.model.dto.request.MessageRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.MessageResponse;
import com.code.BE.model.dto.response.MessageResponse;
import com.code.BE.service.internal.messageService.MessageService;
import com.code.BE.service.internal.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageResponse receivePublicMessage (@Payload MessageRequest messageRequest) {
        if (messageRequest != null) {
            return messageService.save(messageRequest);
        }
        return null;
    }

    @MessageMapping("/private-message")
    public MessageResponse receivePrivateMessage(@Payload MessageRequest messageRequest) {
        if (messageRequest != null) {
            MessageResponse messageResponse = messageService.save(messageRequest);
            String channelId = getChannelId(messageRequest.getSenderId(), messageRequest.getReceiverId());
            simpMessagingTemplate.convertAndSend(
                    "/user/" + channelId + "/private",
                    messageResponse
            );
            return messageResponse;
        }
        return null;
    }

    private String getChannelId(int userId1, int userId2) {
        return userId1 < userId2 ? userId1 + "_" + userId2 : userId2 + "_" + userId1;
    }

    @GetMapping("/api/v1/messages/public-message")
    public ResponseEntity<ApiResponse<List<MessageResponse>>> findPublicMessages() throws Exception {
        ApiResponse<List<MessageResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(messageService.getPublicMessage());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @GetMapping("/api/v1/messages/private-message/{senderId}/{receiverId}")
    public ResponseEntity<ApiResponse<List<MessageResponse>>> findPrivateMessages(
            @PathVariable int senderId, @PathVariable int receiverId) throws Exception {
        ApiResponse<List<MessageResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(messageService.getPrivateMessage(senderId, receiverId));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}
