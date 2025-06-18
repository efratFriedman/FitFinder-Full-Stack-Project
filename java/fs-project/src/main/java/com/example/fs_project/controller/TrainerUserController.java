package com.example.fs_project.controller;

import com.example.fs_project.DTO.TrainerUserDTO;
import com.example.fs_project.model.TraineeUser;
import com.example.fs_project.model.TrainerUser;
import com.example.fs_project.security.CustomUserDetails;
import com.example.fs_project.security.jwt.JwtUtils;
import com.example.fs_project.service.MapStruct;
import com.example.fs_project.service.RoleRepository;
import com.example.fs_project.service.TrainerUserRepository;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/trainerUser")
public class TrainerUserController {

    private TrainerUserRepository trainerUserRepository;
    private static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    private MapStruct mapper;

    public TrainerUserController(TrainerUserRepository trainerUserRepository, MapStruct mapper) {
        this.trainerUserRepository = trainerUserRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getTrainerUsers")
    public ResponseEntity<List<TrainerUserDTO>> getAllTrainerUsers() {
        try{
        return new ResponseEntity<>(mapper.trainersToDTO(trainerUserRepository.findAll()), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getTrainerUserById/{id}")
    public ResponseEntity<TrainerUserDTO> getTrainerUserById(@PathVariable long id) throws IOException {
        try{
        TrainerUser t = trainerUserRepository.findById(id).orElse(null);
        if (t == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mapper.trainerToDTO(t), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addTrainerUser")
    public ResponseEntity<TrainerUser> addTrainerUser(@RequestBody TrainerUser t) {
        try{
        TrainerUser newTrainerUser = trainerUserRepository.save(t);
        return new ResponseEntity<>(newTrainerUser, HttpStatus.CREATED);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateTrainerUserWithImg/{id}")
    public ResponseEntity<TrainerUser> updateTrainerUserWithImg(@PathVariable long id, @RequestBody TrainerUser t) {
        try{
        TrainerUser updatedTrainerUser = trainerUserRepository.findById(id).orElse(null);
        if (t.getId() != id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        if (updatedTrainerUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        updatedTrainerUser = trainerUserRepository.save(t);
        return new ResponseEntity<>(updatedTrainerUser, HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateTrainerUser/{id}")
    public ResponseEntity<TrainerUserDTO> updateTrainerUser(@PathVariable long id, @RequestBody TrainerUser t) throws IOException {
        try{
        TrainerUser updatedTrainerUser = trainerUserRepository.findById(id).orElse(null);
        if (t.getId() != id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        if (updatedTrainerUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        updatedTrainerUser = trainerUserRepository.save(t);
        return new ResponseEntity<>(mapper.trainerToDTO(updatedTrainerUser), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/trainerUserLogin")
    public ResponseEntity<TrainerUserDTO> login(@RequestBody TrainerUser u) throws IOException {
        TrainerUser trainerUser=trainerUserRepository.findByUserName(u.getUserName());
        if (trainerUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(trainerUser.getUserName(), u.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                    .body(mapper.trainerToDTO(trainerUser));

        }catch (AuthenticationException ex){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/trainerUserSignUp")
    public ResponseEntity<TrainerUser> SignUp(@RequestBody TrainerUser t) {
        boolean search = trainerUserRepository.existsTrainerUserByUserName(t.getUserName());

        if (search) {
            return new ResponseEntity<>(t, HttpStatus.CONFLICT);
        }

        String passwordBeforeBcrypt=t.getPassword();
        //הצפנת סיסמא
        t.setPassword(new BCryptPasswordEncoder(8).encode(t.getPassword()));
        t.getRoles().add(roleRepository.findById((long)2).get());
        TrainerUser trainer=trainerUserRepository.save(t);


        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(t.getUserName(), passwordBeforeBcrypt));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                    .body(trainer);
        }
        catch (AuthenticationException ex){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/uploadTrainer")
    public ResponseEntity<TrainerUserDTO> uploadTraineeUserWithImg(@RequestPart("trainer") String trainerUserJSON,
                                                                   @RequestPart("image") MultipartFile file) throws IOException {
       try{
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        TrainerUser trainerUser = objectMapper.readValue(trainerUserJSON, TrainerUser.class);
        String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
        Path filePath = Paths.get(imageUrl);
        Files.write(filePath, file.getBytes());
        trainerUser.setProfilPhoto(file.getOriginalFilename());
        TrainerUser newTrainerUser = trainerUserRepository.save(trainerUser);
        return new ResponseEntity<>(mapper.trainerToDTO(newTrainerUser), HttpStatus.CREATED);}
       catch (Exception e) {
           return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
       }


    }



}
