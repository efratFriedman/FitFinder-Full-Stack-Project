package com.example.fs_project.controller;

import com.example.fs_project.DTO.FeedbackDTO;
import com.example.fs_project.model.Feedback;
import com.example.fs_project.service.FeedbackRepository;
import com.example.fs_project.service.MapStruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private FeedbackRepository feedbackRepository;
    private MapStruct mapper;
    public FeedbackController(FeedbackRepository feedbackRepository,MapStruct mapper) {
        this.feedbackRepository = feedbackRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getFeedbacks")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedback() {
        try{
        var feedbacks=feedbackRepository.findAll();
        return new ResponseEntity<>(mapper.feedbacksToDTO(feedbacks), HttpStatus.OK);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/addFeedback")
    public ResponseEntity<FeedbackDTO> addFeedback(@RequestBody Feedback f) throws IOException {
        try{
        Feedback newFeedback=feedbackRepository.save(f);
        return new ResponseEntity<>(mapper.feedbackToDTO(newFeedback),HttpStatus.CREATED);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @DeleteMapping("/deleteFeedback/{id}")
    public ResponseEntity deleteFeedback(@PathVariable long id) {
        try{
        Feedback f=feedbackRepository.findById(id).orElse(null);
        if(f==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        feedbackRepository.delete(f);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
