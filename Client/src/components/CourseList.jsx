import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardList.css";

const CourseList = ({ courses, addCourse }) => {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    navigate("/courses", { state: { course } });
  };

  return (
    <div className="dashboard">
      <h1>Registered Courses</h1>
      <div className="courses-list">
        <div className="course-card add-course-card" onClick={addCourse}>
          <div className="add-course-content">
            <h1 className="Add-btn">+</h1>
          </div>
        </div>
        {courses.length === 0 ? (
          <div className="course-card no-courses-card">
            <p className="no-courses">No courses registered</p>
          </div>
        ) : (
          courses.map((course, index) => (
            <div
              key={index}
              className="course-card"
              onClick={() => handleCourseClick(course)}
            >
              <img
                src={course.image}
                alt={course.name}
                className="course-image"
                style={{ borderColor: `hsl(${(index * 40) % 360}, 70%, 50%)` }}
              />
              <div className="course-info">
                <h2 className="course-name">{course.name}</h2>
                <h6 className="registration-time">
                  Registered on: {course.time}
                </h6>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
