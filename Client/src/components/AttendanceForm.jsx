import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("courseName");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course_name, setCourseName] = useState("");
  // const [currentPosition, setCurrentUserPosition] = useState();

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

  // const handleGeolocation = useCallback(() => {
  //   if (navigator.geolocation) {
  //     const watchId = navigator.geolocation.watchPosition(
  //       (position) => {
  //         const userLoc = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         console.log("User Location: ", userLoc);
  //         setCurrentUserPosition(userLoc);
  //       },
  //       (error) => {
  //         console.log("Error getting the user location: ", error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 0,
  //         timeout: 30000,
  //       }
  //     );

  //     return () => {
  //       navigator.geolocation.clearWatch(watchId);
  //     };
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, [setCurrentUserPosition]);

  // useEffect(() => {
  //   console.log("Geolocation: ", currentPosition);
  //   const cleanup = handleGeolocation();
  //   return cleanup;
  // }, [handleGeolocation, currentPosition]);

  ///////////////////////////////

  // import React, { useState, useEffect } from "react";

  // Function to calculate the distance between two latitude-longitude points
  const getDistanceFromLatLonInKm = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }, []);

  // Convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // const LocationChecker = () => {
  const [isWithinRange, setIsWithinRange] = useState(null);

  useEffect(() => {
    // Target location (latitude and longitude)
    const targetLocation = {
      lat: 6.6732, // Replace with your target latitude
      lon: -1.5674, // Replace with your target longitude
    };

    // Desired range in kilometers
    const range = 1; // Replace with your desired range

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Calculate distance from user location to target location
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          targetLocation.lat,
          targetLocation.lon
        );

        // Check if user is within the specified range
        if (distance <= range) {
          setIsWithinRange(true);
        } else {
          setIsWithinRange(false);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [getDistanceFromLatLonInKm]);

  // return (
  //   <div>
  //     {isWithinRange === null ? (
  //       <p>Checking location...</p>
  //     ) : isWithinRange ? (
  //       <p>You are within the specified location range.</p>
  //     ) : (
  //       <p>You are outside the specified location range.</p>
  //     )}
  //   </div>
  // );
  // };

  // export default LocationChecker;

  ////////////////////////////
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
            course_name: courseName,
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
      {isWithinRange === null ? (
        <p>Checking location...</p>
      ) : isWithinRange ? (
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
      ) : (
        <p>You are outside the specified location range.</p>
      )}
    </div>
  );
};

export default AttendanceForm;
