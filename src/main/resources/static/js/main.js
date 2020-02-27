function getTeachers() {
    $.get('api/teachers', function(teachers){
        displayTeachers(teachers);
    });
}

function getCourses() {
    $.get('api/courses', function(courses){
        displayCourses(courses);
    });
}

function displayTeachers(teachers) {
     var teacherCourseContainer = $('#teacherCourseContainer');
     teacherCourseContainer.empty();
     $('#teacherCourseContainer').append('<thead><tr><th>Id</th><th>Name</th></tr></thead>');
     $.each(teachers, function(index, teacher) {
     $('#teacherCourseContainer').append('<tr><td>' + teacher.id + '</td>' + '<td>' +
        teacher.name + '</td></tr>');
     });
}

function displayCourses(courses) {
     var teacherCourseContainer = $('#teacherCourseContainer');
     teacherCourseContainer.empty();
     $('#teacherCourseContainer').append('<thead><tr><th>Id</th><th>Name</th><th>Teacher Name</th></tr></thead>');
     $.each(courses, function(index, course) {
         $('#teacherCourseContainer').append('<tr><td>' + course.id + '</td>' + '<td>' +
         course.name + '</td><td>' + course.teacher.name + '</td></tr>');
     });
}

function postTeacher(teacher){
    var jsonTeacher = JSON.stringify(teacher);
    $.ajax({
        url: 'api/teachers',
        type: 'POST',
        contentType: 'application/json',
        data: jsonTeacher,
        success: function() {
            alert('We created a new teacher..');
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function createTeacher() {
    var teacherName = $('#teacherNameInput').val();
    if (!teacherName) {
        alert('The teacher name should be set..');
        return;
    }
    if (teacherName.length < 3) {
        alert('Name is too short..');
        return;
    }
    var teacher = {
        name: teacherName
    };
    postTeacher(teacher);
}

function createCourse() {
    var courseName = $('#courseNameInput').val();
    if (!courseName) {
        alert('The course name should be set..');
        return;
    }
    if (courseName.length < 3) {
        alert('Course name is too short..');
        return;
    }
    var course = {
            teacher: {
                id: $('#teacherSelect').val()
            },
            name: courseName
    };
    postCourse(course);
}

function postCourse(course){
    var jsonCourse = JSON.stringify(course);
    $.ajax({
        url: 'api/courses',
        type: 'POST',
        contentType: 'application/json',
        data: jsonCourse,
        success: function() {
            alert('We created a new course..');
            getCourses()
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function selectTeachers() {
    $.get('api/teachers', function(teachers){
           $.each(teachers, function(index, teacher) {
                $('#teacherSelect').append('<option value = " ' + teacher.id + ' " >' +
                                                    teacher.name + '</option>');
           });
    });

}

$(document).ready(function () {
       $("#getTeachersButton").click(getTeachers);
       $("#getCoursesButton").click(getCourses);
       $("#createTeacherButton").click(createTeacher);
       $("#createCourseButton").click(createCourse);
       selectTeachers();
});