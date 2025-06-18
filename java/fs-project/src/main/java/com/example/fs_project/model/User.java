package com.example.fs_project.model;

import com.example.fs_project.enums.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User {
 @Id
 @GeneratedValue
 private long id;

    private String userName;
    private String password;
    private String  email;
    private LocalDate birthdate;
    private String phoneNumber;
    @Enumerated
    private Gender gender;
    private String profilPhoto;//ניתוב לתמונה


    @ManyToMany
    private Set<Role> roles = new HashSet<>();

    public User() {}

    public User(LocalDate birthdate, String email, String password, String phoneNumber, String profilPhoto, String userName,Gender gender) {
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profilPhoto = profilPhoto;
        this.userName = userName;
        this.gender = gender;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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

    public String getProfilPhoto() {
        return profilPhoto;
    }

    public void setProfilPhoto(String profilPhoto) {
        this.profilPhoto = profilPhoto;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
