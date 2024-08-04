package com.code.BE.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageResponse {
    private int id;
    private String message;
    private String date;
    private String messageStatus;
    private int senderId;
    private int receiverId;
}
