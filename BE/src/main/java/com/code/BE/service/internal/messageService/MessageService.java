package com.code.BE.service.internal.messageService;

import com.code.BE.model.dto.request.MessageRequest;
import com.code.BE.model.dto.response.MessageResponse;

import java.util.List;

public interface MessageService {
    MessageResponse save (MessageRequest messageRequest);
    void deleteById (int id);
    MessageResponse findById (int id);

    List<MessageResponse> getPrivateMessage (int senderId, int receiverId);
    List<MessageResponse> getPublicMessage ();
}
