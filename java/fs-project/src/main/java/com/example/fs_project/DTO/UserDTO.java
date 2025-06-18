package com.example.fs_project.DTO;

import com.example.fs_project.enums.Gender;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;

public class UserDTO {
    private long id;

    private String userName;
    private String password;
    private String  email;
    private LocalDate birthdate;
    private String phoneNumber;
    private Gender gender;
    private String profilPhoto;
    private String profileImage;


    public String getProfilPhoto() {
        return profilPhoto;
    }

    public void setProfilPhoto(String profilPhoto) {
        this.profilPhoto = profilPhoto;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
