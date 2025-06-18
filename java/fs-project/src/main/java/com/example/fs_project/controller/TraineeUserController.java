package com.example.fs_project.controller;


import com.example.fs_project.DTO.TraineeUserDTO;
import com.example.fs_project.model.TraineeUser;
import com.example.fs_project.security.CustomUserDetails;
import com.example.fs_project.security.jwt.JwtUtils;
import com.example.fs_project.service.MapStruct;
import com.example.fs_project.service.RoleRepository;
import com.example.fs_project.service.TraineeUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin
@RestController
@RequestMapping("/api/traineeUser")
public class TraineeUserController {
    private TraineeUserRepository traineeUserRepository;
    private MapStruct mapper;

    private static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    public TraineeUserController(TraineeUserRepository traineeUserRepository, MapStruct mapper) {
        this.traineeUserRepository = traineeUserRepository;
        this.mapper = mapper;
    }


    @PostMapping("/addTraineeUser")
    public ResponseEntity<TraineeUser> addTraineeUser(@RequestBody TraineeUser t) {
        try {
            TraineeUser newTraineeUser = traineeUserRepository.save(t);
            return new ResponseEntity<>(newTraineeUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/updateTraineeUserDetailsWithImg/{id}")
    public ResponseEntity<TraineeUser> updateTraineeUserDetailsWithImg(@PathVariable long id, @RequestBody TraineeUser t) {
        try {
            TraineeUser updatedTraineeUser = traineeUserRepository.findById(id).orElse(null);
            if (t.getId() != id) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            if (updatedTraineeUser == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            t.setBMI();
            updatedTraineeUser = traineeUserRepository.save(t);
            return new ResponseEntity<>(updatedTraineeUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/updateTraineeUserDetails/{id}")
    public ResponseEntity<TraineeUserDTO> updateTraineeUserDetails(@PathVariable long id, @RequestBody TraineeUser t) throws IOException {
        try {
            TraineeUser updatedTraineeUser = traineeUserRepository.findById(id).orElse(null);
            if (t.getId() != id) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            if (updatedTraineeUser == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            t.setBMI();
            updatedTraineeUser = traineeUserRepository.save(t);
            TraineeUserDTO m = mapper.traineeToDTO(updatedTraineeUser);
            return new ResponseEntity<>(m, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/traineeUserLogin")
    public ResponseEntity<TraineeUserDTO> login(@RequestBody TraineeUser t) throws IOException {
        try {
            TraineeUser traineeUser = traineeUserRepository.findTraineeUserByUserName(t.getUserName());
            if (traineeUser == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(traineeUser.getUserName(), t.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(mapper.traineeToDTO(traineeUser));
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (AuthenticationException ex) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/traineeUserSignUp")
    public ResponseEntity<TraineeUser> SignUp(@RequestBody TraineeUser t) {
        try {
            boolean search = traineeUserRepository.existsTraineeUserByUserName(t.getUserName());
            if (search) {
                return new ResponseEntity<>(t, HttpStatus.CONFLICT);
            }
            String passwordBeforeBcrypt = t.getPassword();
            t.setPassword(new BCryptPasswordEncoder(8).encode(t.getPassword()));
            t.getRoles().add(roleRepository.findById((long) 1).get());
            System.out.println(roleRepository.findById((long) 1).get().getName());
            TraineeUser trainee = traineeUserRepository.save(t);
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(t.getUserName(), passwordBeforeBcrypt));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(trainee);
        } catch (AuthenticationException ex) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/uploadTrainee")
    public ResponseEntity<TraineeUserDTO> uploadTraineeUserWithImg(@RequestPart("trainee") String traineeUserJSON,
                                                                   @RequestPart("image") MultipartFile file) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            TraineeUser traineeUser = objectMapper.readValue(traineeUserJSON, TraineeUser.class);

            String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
            Path filePath = Paths.get(imageUrl);
            Files.write(filePath, file.getBytes());

            traineeUser.setProfilPhoto(file.getOriginalFilename());

            TraineeUser newTraineeUser = traineeUserRepository.save(traineeUser);

            return new ResponseEntity<>(mapper.traineeToDTO(newTraineeUser), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
