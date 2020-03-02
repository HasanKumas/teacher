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
     $('#teacherCourseHeadContainer').empty();
     $('#teacherCourseBodyContainer').empty();

     $('#teacherCourseHeadContainer').html("<b>Teachers Table</b>");
     $('#teacherCourseHeadContainer').append('<tr><th>Id</th><th>Name</th><th>Actions</th></tr>');
     $.each(teachers, function(index, teacher) {
        $('#teacherCourseBodyContainer').append('<tr><td>' + teacher.id + '</td><td>' +  teacher.name +
            '</td><td><button class = "remove-button" teacherId = " ' + teacher.id + ' " >Delete </button></td></tr>');
     });
     $("#teacherCourseBodyContainer .remove-button").click(removeTeacher);
}

function displayCourses(courses) {
     $('#teacherCourseHeadContainer').empty();
     $('#teacherCourseBodyContainer').empty();

     $('#teacherCourseHeadContainer').html('<b>Courses Table</b>');
     $('#teacherCourseHeadContainer').append('<tr><th>Id</th><th>Name</th><th>Teacher Name</th><th>Actions</th></tr>');
     $.each(courses, function(index, course) {
         $('#teacherCourseBodyContainer').append('<tr><td>' + course.id + '</td>' + '<td>' +
         course.name + '</td><td>' + course.teacher.name + '</td><td><button class = "remove-button" courseId = " ' + course.id + ' " >Delete </button></td></tr>');
     });
     $("#teacherCourseBodyContainer .remove-button").click(removeCourse);
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
            $('#teacherNameInput').val(" ")
            getTeachers();
            selectTeachers();
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
            $('#courseNameInput').val(" ")
            getCourses()
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function selectTeachers() {
    $('#teacherSelect').empty();
    $.get('api/teachers', function(teachers){
           $.each(teachers, function(index, teacher) {
                $('#teacherSelect').append('<option value = " ' + teacher.id + ' " >' +
                                                    teacher.name + '</option>');
           });
    });

}

function removeTeacher() {
    var teacherId = $(this).attr('teacherId');

    $.ajax({
        url: 'api/teachers/'+ teacherId,
        type: 'DELETE',
        success: function(){
            alert('teacher ' + teacherId + ' deleted!');
            getTeachers();
            selectTeachers();
        },
        error: function(){
            alert('Something went wrong..Check if the teacher registered to a course. If registered then first delete related course to be able to delete the teacher..');
        }
    });
}

function removeCourse() {
    var courseId = $(this).attr('courseId');

    $.ajax({
        url: 'api/courses/'+ courseId,
        type: 'DELETE',
        success: function(){
            alert('course ' + courseId + ' deleted!');
            getCourses();
        },
        error: function(){
            alert('Something went wrong...');
        }
    });
}

$(document).ready(function () {
       $("#getTeachersButton").click(getTeachers);
       $("#getCoursesButton").click(getCourses);
       $("#createTeacherButton").click(createTeacher);
       $("#createCourseButton").click(createCourse);
       selectTeachers();
});