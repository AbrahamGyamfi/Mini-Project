import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("courseName");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    index_No: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("http://localhost:8000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          Index_No: formData.index_No, // Ensure backend receives Index_No
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({ name: "", index_No: "" });
        setSubmitted(true);
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Error submitting form:", result);
      }
    } catch (error) {
      console.error("There was an error during form submission:", error);
    }
  };

  return (
    <div className="attendance-form-page">
      <h2>Attendance for {courseName}</h2>
      {submitted ? (
        <p>Thank you for your submission!</p>
      ) : (
        <form onSubmit={handleSubmit} className="attendance-form" method="POST">
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Index Number:
            <input
              type="text"
              name="index_No"
              value={formData.index_No}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AttendanceForm;
