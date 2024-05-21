package com.code.BE.service.external.mailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String from, String to, String subject, String content) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(from);
        message.setRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject(subject);
        message.setContent(content, "text/html; charset=utf-8");
        javaMailSender.send(message);
    }
}
