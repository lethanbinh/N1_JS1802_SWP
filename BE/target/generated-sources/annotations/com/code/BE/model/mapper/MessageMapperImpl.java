package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.MessageRequest;
import com.code.BE.model.dto.response.MessageResponse;
import com.code.BE.model.entity.Message;
import com.code.BE.model.entity.User;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-01T10:37:55+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public MessageResponse toResponse(Message message) {
        if ( message == null ) {
            return null;
        }

        MessageResponse messageResponse = new MessageResponse();

        messageResponse.setSenderId( messageSenderId( message ) );
        messageResponse.setReceiverId( messageReceiverId( message ) );
        messageResponse.setId( message.getId() );
        messageResponse.setMessage( message.getMessage() );
        if ( message.getDate() != null ) {
            messageResponse.setDate( new SimpleDateFormat().format( message.getDate() ) );
        }
        messageResponse.setMessageStatus( message.getMessageStatus() );

        return messageResponse;
    }

    @Override
    public List<MessageResponse> toResponseList(List<Message> messageList) {
        if ( messageList == null ) {
            return null;
        }

        List<MessageResponse> list = new ArrayList<MessageResponse>( messageList.size() );
        for ( Message message : messageList ) {
            list.add( toResponse( message ) );
        }

        return list;
    }

    @Override
    public Message toEntity(MessageRequest messageRequests) {
        if ( messageRequests == null ) {
            return null;
        }

        Message message = new Message();

        message.setMessage( messageRequests.getMessage() );
        message.setMessageStatus( messageRequests.getMessageStatus() );

        return message;
    }

    @Override
    public List<Message> toEntityList(List<MessageRequest> messageRequestsList) {
        if ( messageRequestsList == null ) {
            return null;
        }

        List<Message> list = new ArrayList<Message>( messageRequestsList.size() );
        for ( MessageRequest messageRequest : messageRequestsList ) {
            list.add( toEntity( messageRequest ) );
        }

        return list;
    }

    private int messageSenderId(Message message) {
        if ( message == null ) {
            return 0;
        }
        User sender = message.getSender();
        if ( sender == null ) {
            return 0;
        }
        int id = sender.getId();
        return id;
    }

    private int messageReceiverId(Message message) {
        if ( message == null ) {
            return 0;
        }
        User receiver = message.getReceiver();
        if ( receiver == null ) {
            return 0;
        }
        int id = receiver.getId();
        return id;
    }
}
