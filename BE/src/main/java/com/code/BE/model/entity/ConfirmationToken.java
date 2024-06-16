package com.code.BE.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private Date createdDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "expired_date")
    private LocalDateTime expiredDate;

    public ConfirmationToken(User user) {
        this.user = user;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    @Override
    public String toString() {
        return "ConfirmationToken{" +
                "id=" + id +
                ", confirmationToken='" + confirmationToken + '\'' +
                ", createdDate=" + createdDate +
                ", expiredDate=" + expiredDate +
                '}';

    }
}