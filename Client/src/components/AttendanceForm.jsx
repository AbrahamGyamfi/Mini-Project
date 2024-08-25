// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import "./AttendanceForm.css";

// const AttendanceForm = () => {
//   const [searchParams] = useSearchParams();
//   const courseName = searchParams.get("courseName");
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [course_name, setCourseName] = useState("");

//   console.log("COURSE NAME: ", course_name);

//   const [formData, setFormData] = useState({
//     name: "",
//     Index_No: "",
//     course_name: "",
//   });

//   useEffect(() => {
//     const course_name = window.localStorage.getItem("CourseName");
//     setCourseName(course_name);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//       [course_name]: course_name,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // .replace(" ", "")
//     // .toUpperCase();

//     console.log("Submit:::::::");
//     try {
//       console.log(process.env.REACT_APP_LOCALHOST_SERVER);
//       const response = await fetch(
//         `${process.env.REACT_APP_LOCALHOST_SERVER}/addUser`,
//         {
//           // Ensure the port matches your backend
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: formData.name, // Ensure the field names match
//             Index_No: formData.Index_No,
//             course_name: formData.course_name,
//           }),
//         }
//       );

//       console.log("Submited", response);

//       if (response.ok) {
//         const newUser = await response.json(); // Get the new user data if needed
//         console.log("NEW USER: ", newUser);
//         console.log("User added successfully:", newUser);
//         setFormData({ name: "", Index_No: "", course_name: "" }); // Reset form fields
//         setSubmitted(true);
//       } else {
//         const result = await response.json();
//         console.error("Error submitting form:", result.message); // Log the specific error message
//       }
//     } catch (error) {
//       console.error("There was an error during form submission:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Loading...
//       </div>
//     );
//   }

//   if (submitted) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           width: "100%",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <p>Thank you for your submission!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="attendance-form-page">
//       <h2>Attendance for {courseName}</h2>
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Index Number:
//           <input
//             type="text"
//             name="Index_No"
//             value={formData.Index_No}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           style={{
//             width: "100px",
//             height: "40px",
//             backgroundColor: "green",
//             borderRadius: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("courseName");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course_name, setCourseName] = useState("");

  console.log("COURSE NAME: ", course_name);

  const [formData, setFormData] = useState({
    name: "",
    Index_No: "",
    course_name: "", // This will be updated later
  });

  useEffect(() => {
    const storedCourseName = window.localStorage.getItem("CourseName");
    setCourseName(storedCourseName);

    // Update formData with the course name when it's available
    setFormData((prevData) => ({
      ...prevData,
      course_name: storedCourseName,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submit:::::::");
    try {
      console.log(process.env.REACT_APP_LOCALHOST_SERVER);
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_SERVER}/addUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            Index_No: formData.Index_No,
            course_name: formData.course_name,
          }),
        }
      );

      console.log("Submitted", response);

      if (response.ok) {
        const newUser = await response.json();
        console.log("User added successfully:", newUser);
        setFormData({ name: "", Index_No: "", course_name: course_name });
        setSubmitted(true);
      } else {
        const result = await response.json();
        console.error("Error submitting form:", result.message);
      }
    } catch (error) {
      console.error("There was an error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Thank you for your submission!</p>
      </div>
    );
  }

  return (
    <div className="attendance-form-page">
      <h2>Attendance for {courseName}</h2>
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
            name="Index_No"
            value={formData.Index_No}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            width: "100px",
            height: "40px",
            backgroundColor: "green",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
