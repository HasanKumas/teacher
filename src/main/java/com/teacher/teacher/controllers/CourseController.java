package com.teacher.teacher.controllers;

import com.teacher.teacher.models.Course;
import com.teacher.teacher.repositories.CourseRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/courses")//end point
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
    public void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateCourse(@PathVariable("id") Long id,  @RequestBody Course course) throws NotFoundException{
        Optional<Course> originalCourse =courseRepository.findById(id);
        if(!originalCourse.isPresent()) {
            throw new NotFoundException("Course not found");
        }

            course.setId(id);
            courseRepository.save(course);
    }
}
