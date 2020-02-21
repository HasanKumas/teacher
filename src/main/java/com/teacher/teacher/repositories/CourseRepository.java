package com.teacher.teacher.repositories;

import com.teacher.teacher.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
