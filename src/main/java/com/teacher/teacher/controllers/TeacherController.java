package com.teacher.teacher.controllers;

import com.teacher.teacher.models.Teacher;
import com.teacher.teacher.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teacher")//end point
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
    public void updateTeacher(@PathVariable("id") Long id,  @RequestBody Teacher teacher) {
        teacher.setId(id);
        teacherRepository.save(teacher);
    }
}
