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

  const downloadAttendanceList = async () => {
    try {
      // Fetch the attendance list data
      const response = await fetch(
        "https://mini-project-uapc.onrender.com/api/attendance-list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("RESPONSE: ", response);
      // Log the response for debugging

      // Check if the response is okay
      if (!response.ok) {
        console.log("Error occur here");
        throw new Error("Network response was not ok");
      }
      const res = await response.json();

      let formattedData = [];
      res.data.forEach(({ name, Index_No }) => {
        formattedData.push({
          name,
          Index_No,
        });
      });

      const maxNameLength = Math.max(
        ...formattedData.map((entry) => entry.name.length),
        "Name".length
      );
      const maxIndexLength = Math.max(
        ...formattedData.map((entry) => entry.Index_No.length),
        "Index Number".length
      );

      // Create a string in a table format
      let tableString = "Name".padEnd(maxNameLength, " ") + "  Index Number\n"; // Header
      formattedData.forEach((entry) => {
        tableString +=
          entry.name.padEnd(maxNameLength, " ") +
          "  " +
          entry.Index_No.padEnd(maxIndexLength, " ") +
          "\n"; // Data rows
      });

      const blob = new Blob([tableString], { type: "text/plain" });

      // Create a Blob object with the text content
      // const blob = new Blob([JSON.stringify(formattedData), null, 2], {
      //   type: "text/plain",
      // });

      // // Generate a filename
      const filename = `AttendanceList-${course.name}.txt`;

      // // Simulate a download link click (browser specific behavior)
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      // // Clean up the URL object
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error generating the attendance list text file:", error);
      // alert("Failed to fetch attendance list. Please try again later.");
    }
  };

  return (
    <div className="attendance-page">
      <h2 className="heading">
        Attendance For {course.name}{" "}
        <button
          style={{
            width: "200px",
            marginLeft: "600px",
          }}
          onClick={downloadAttendanceList}
        >
          Download Attendance List
        </button>
      </h2>

      <div className="qr-code-container">
        <QRCode value={qrCodeUrl} size={450} />
      </div>
      <p>Scan this code to mark your attendance for {course.name}</p>
    </div>
  );
};

export default AttendancePage;
