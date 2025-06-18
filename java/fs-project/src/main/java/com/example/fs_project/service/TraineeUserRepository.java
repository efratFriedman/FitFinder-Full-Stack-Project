package com.example.fs_project.service;

import com.example.fs_project.model.TraineeUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraineeUserRepository extends JpaRepository<TraineeUser, Long> {
    public TraineeUser findTraineeUserByUserName(String userName);
    boolean existsTraineeUserByUserName(String userName);
}
