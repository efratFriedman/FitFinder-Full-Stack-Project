package com.example.fs_project.controller;


import com.example.fs_project.model.Category;
import com.example.fs_project.service.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private CategoryRepository categoryRepository;
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/getCategories")
    public ResponseEntity<List<Category>> getCategories() {
        try{
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCategoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable long id) {
        try{
        Category c=categoryRepository.findById(id).orElse(null);
        if(c==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c, HttpStatus.OK);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category>addCategory(@RequestBody Category c) {
        try{
        Category newCategoty=categoryRepository.save(c);
        return new ResponseEntity<>(newCategoty, HttpStatus.CREATED);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity deleteCategory(@PathVariable long id) {
        try{
        Category c=categoryRepository.findById(id).orElse(null);
        if(c==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        categoryRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
