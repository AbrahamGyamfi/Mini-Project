import React from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import "./AttendancePage.css";

const AttendancePage = () => {
  const location = useLocation();
  const { course } = location.state;

  const qrCodeUrl = `${
    window.location.origin
  }/attendance-form?courseName=${encodeURIComponent(course.name)}`;

  return (
    <div className="attendance-page">
      <h2 className="heading">Attendance For {course.name}</h2>
      <div className="qr-code-container">
        <QRCode value={qrCodeUrl} size={450} />
      </div>
      <p>Scan this code to mark your attendance for {course.name}</p>
    </div>
  );
};

export default AttendancePage;
