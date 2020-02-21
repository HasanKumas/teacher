package com.teacher.teacher.controllers;

import com.teacher.teacher.models.Course;
import com.teacher.teacher.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/course")//end point
public class CourseController {
    @Autowired//connect to database
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getCourse (){
        return courseRepository.findAll();
    }

    @PostMapping
    public void addCourse(@RequestBody Course course) {
        courseRepository.save(course);
    }

    @DeleteMapping("/{id}")
    void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateCourse(@PathVariable("id") Long id,  @RequestBody Course course) {
        course.setId(id);
        courseRepository.save(course);
    }
}
