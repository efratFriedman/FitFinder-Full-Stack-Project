package com.example.fs_project.service;

import com.example.fs_project.model.TrainerUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerUserRepository extends JpaRepository<TrainerUser, Long> {
    public TrainerUser findByUserName(String userName);
    public boolean existsTrainerUserByUserName(String userName);
}
