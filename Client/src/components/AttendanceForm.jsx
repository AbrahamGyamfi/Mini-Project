import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("courseName");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    index_No: "",
  });

  // i
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting form data:", formData);
      const response = await fetch(
        "https://mini-project-uapc.onrender.com/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setFormData({ name: "", index_No: "" });
        console.log("Form submitted successfully:", result);
        setSubmitted(true);
      } else {
        console.error("Error submitting form:", result);
      }
    } catch (error) {
      console.error("There was an error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading .... </div>;
  }

  return (
    <div className="attendance-form-page">
      <h2>Attendance for {courseName}</h2>
      {submitted && (
        <div>
          {" "}
          <p>Thank you for your submission!</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="attendance-form">
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
        <button
          type="submit"
          style={{
            width: "100px", // increase width
            height: "40px", // adjust height
            backgroundColor: "green",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
