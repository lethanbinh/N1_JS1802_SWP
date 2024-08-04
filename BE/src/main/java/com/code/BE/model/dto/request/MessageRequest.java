package com.code.BE.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageRequest {
    private String message;
    private String messageStatus;
    private int senderId;
    private int receiverId;
}
