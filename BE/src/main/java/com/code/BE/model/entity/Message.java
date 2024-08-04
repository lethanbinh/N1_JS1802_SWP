package com.code.BE.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String message;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column
    private String messageStatus;

    @Column
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    // if public message receiver will be null
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;
}
