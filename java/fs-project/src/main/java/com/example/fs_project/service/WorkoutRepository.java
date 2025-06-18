package com.example.fs_project.service;

import com.example.fs_project.enums.FitnessLevel;
import com.example.fs_project.enums.Gender;
import com.example.fs_project.model.Workout;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

@Query("SELECT w FROM Workout w WHERE w.startAge <= :userAge AND w.endAge >= :userAge AND w.fitnessLevel = :fitnessLevel AND w.gender = :gender")
List<Workout> findSuitableWorkouts(@Param("userAge") int userAge, @Param("fitnessLevel") FitnessLevel fitnessLevel, @Param("gender") Gender gender);

List<Workout> findAllByGender(Gender gender);

    @Modifying
    @Transactional
    @Query("UPDATE Workout w SET w.currentParticipants = 0")
    void resetAllParticipants();

}
