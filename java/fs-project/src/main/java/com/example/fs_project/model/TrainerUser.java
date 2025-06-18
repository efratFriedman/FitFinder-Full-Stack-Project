package com.example.fs_project.model;

import com.example.fs_project.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@DiscriminatorValue("trainer")

public class TrainerUser extends User {

    @Id
    @GeneratedValue
    private long id;

    private int experience;
    private String bio;//Personal description of the trainer

    @JsonIgnore
    @OneToMany(mappedBy = "trainerWorkout")
    private List<Workout> workouts;

    public TrainerUser() {
        super();
    }

    public TrainerUser(LocalDate birthdate, String email, String password, String phoneNumber, String profilPhoto, String userName, Gender gender, String bio, int experience, long id, List<Workout> workouts) {
        super(birthdate, email, password, phoneNumber, profilPhoto, userName, gender);
        this.bio = bio;
        this.experience = experience;
        this.id = id;
        this.workouts = workouts;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }




}
