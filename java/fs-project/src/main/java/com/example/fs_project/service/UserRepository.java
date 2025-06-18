package com.example.fs_project.service;

import com.example.fs_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserName(String username);
}
