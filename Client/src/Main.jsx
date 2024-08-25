import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CoursesPage from "./pages/CoursesPage";
import Dashboard from "./pages/Dashboard";
import "./components/Sidebar.css";
import AttendancePage from "./pages/AttendancePage";
import AttendanceForm from "./components/AttendanceForm";
import Pic1 from "./components/Assets/book.jpeg";
import Pic2 from "./components/Assets/book.jpg";
import Pic3 from "./components/Assets/card1.jpg";
import Pic4 from "./components/Assets/card2.jpg";
import Pic5 from "./components/Assets/card3.jpg";

// Define a constant array of image imports
const imageArray = [Pic1, Pic2, Pic3, Pic4, Pic5];

function Main() {
  const [courses, setCourses] = useState([]);

  const addCourse = () => {
    const courseName = prompt("Enter course name:");
    const registrationTime = new Date().toLocaleString();
    if (courseName) {
      const courseImage = imageArray[courses.length % imageArray.length];
      const newCourse = {
        name: courseName,
        image: courseImage,
        time: registrationTime,
      };
      setCourses([...courses, newCourse]);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Sidebar>
              <Dashboard courses={courses} addCourse={addCourse} />
            </Sidebar>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard courses={courses} addCourse={addCourse} />
            </Sidebar>
          }
        />
        <Route
          path="/courses"
          element={
            <Sidebar>
              <CoursesPage courses={courses} />
            </Sidebar>
          }
        />
        <Route
          path="/attendance"
          element={
            <Sidebar>
              <AttendancePage />
            </Sidebar>
          }
        />
        <Route path="/attendance-form" element={<AttendanceForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
