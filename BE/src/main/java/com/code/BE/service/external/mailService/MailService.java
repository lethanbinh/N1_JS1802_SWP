package com.code.BE.service.external.mailService;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendEmail (String from, String to, String subject, String content) throws MessagingException;
}
