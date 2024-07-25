import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const CoursesPage = ({ courses }) => {
  const navigate = useNavigate();

  const handleStartAttendance = (course) => {
    navigate("/attendance", { state: { course } });
  };

  return (
    <div className="courses-page1">
      <h2 className="heading">
        <button onClick={() => navigate("/dashboard")}>Back</button>Courses Page
      </h2>

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul className="courses-list1">
          {courses.map((course, index) => (
            <li key={index} className="course-item1">
              <div className="course-details1">
                <img
                  src={course.image}
                  alt={course.name}
                  className="course-image1"
                />
                <div className="details">
                  <h1 className="course-title">{course.name}</h1>
                  <p className="reg-time">Registered on: {course.time}</p>
                  <button onClick={() => handleStartAttendance(course)}>
                    Start Attendance
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesPage;
