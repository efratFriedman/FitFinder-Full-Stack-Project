package com.example.fs_project.service;

import com.example.fs_project.model.TraineeUser;
import com.example.fs_project.model.TrainerUser;
import com.example.fs_project.model.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
//    List<UserSchedule> findAllByTraineeUser(TraineeUser traineeUser);

    @Query("SELECT u FROM UserSchedule u WHERE u.traineeUser.id=:tId")
    List<UserSchedule> findByUserId(@Param("tId") Long tId);
}