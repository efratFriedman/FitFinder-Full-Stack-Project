package com.example.fs_project.service;

import com.example.fs_project.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImp implements EmailService{
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendEmail(EmailDetails details){
        try{

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(sender);
            message.setTo(details.getRecipient());
            message.setText(details.getMsgBody());
            message.setSubject(details.getSubject());

            mailSender.send(message);
            return "Email sent successfully";
        }
        catch(Exception e){
            return "Error sending email";
        }
    }
}
