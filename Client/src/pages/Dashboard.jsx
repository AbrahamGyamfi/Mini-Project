import React from "react";
import "./Dashboard.css";
import CourseList from "../components/CourseList";

const Dashboard = ({ courses, addCourse }) => {
  return (
    <div className="main">
      <div className="header">Welcome to Dashboard!</div>
      <div className="courses-section">
        <CourseList courses={courses} addCourse={addCourse} />
      </div>
    </div>
  );
};

export default Dashboard;
