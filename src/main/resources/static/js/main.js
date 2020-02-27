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

$(document).ready(function () {
       $("#getTeachersButton").click(getTeachers);
       $("#getCoursesButton").click(getCourses);
});