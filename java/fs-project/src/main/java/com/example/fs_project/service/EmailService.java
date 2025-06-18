package com.example.fs_project.service;

import com.example.fs_project.model.EmailDetails;

public interface EmailService {
    String sendEmail(EmailDetails details);
}
