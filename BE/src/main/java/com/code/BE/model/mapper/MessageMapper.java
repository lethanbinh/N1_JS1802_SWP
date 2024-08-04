package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.MessageRequest;
import com.code.BE.model.dto.response.MessageResponse;
import com.code.BE.model.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(source = "message.sender.id", target = "senderId")
    @Mapping(source = "message.receiver.id", target = "receiverId")

    // Map Entity to Response
    MessageResponse toResponse(Message message);
    List<MessageResponse> toResponseList(List<Message> messageList);
    // Map Request to Entity
    Message toEntity(MessageRequest messageRequests);
    List<Message> toEntityList(List<MessageRequest> messageRequestsList);
}
