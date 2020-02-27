package com.teacher.teacher.controllers;

import com.teacher.teacher.models.Course;
import com.teacher.teacher.models.Teacher;
import com.teacher.teacher.repositories.TeacherRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/teachers")//end point
public class TeacherController {
    @Autowired//connect to database
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getTeachers (){
        return teacherRepository.findAll();
    }

    @PostMapping
    public void addTeacher(@RequestBody Teacher teacher) {
        teacherRepository.save(teacher);
    }

    @DeleteMapping("/{id}")
    void deleteTeacher(@PathVariable Long id) {
        teacherRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable("id") Long id,  @RequestBody Teacher teacher) throws NotFoundException{
        Optional<Teacher> originalTeacher =teacherRepository.findById(id);
        if(!originalTeacher.isPresent()) {
            throw new NotFoundException("Teacher not found");
        }
        teacher.setId(id);
        teacherRepository.save(teacher);
    }
}
