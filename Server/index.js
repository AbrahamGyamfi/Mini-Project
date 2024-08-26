import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: `${process.env.LOCALHOST_CLIENT}`,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;

const mongoConnection = async (req, res, next) => {
  const course_name = req.query.course_name || req.body.course_name;

  const url_mongo = `mongodb+srv://solution:solution17@cluster0.udyro6p.mongodb.net/${course_name}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(url_mongo);
    console.log("Database connected successfully");
    next();
  } catch (error) {
    console.log("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Index_No: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

app.get("/getUsers", mongoConnection, async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addUser", mongoConnection, async (req, res) => {
  const { name, Index_No } = req.body;

  // Validate the request body
  if (!name || !Index_No) {
    console.log("Validation failed: Missing name or Index_No");
    return res.status(400).json({ message: "Name and Index_No are required" });
  }

  try {
    // Create a new user
    const newUser = await UserModel.create({ name, Index_No });

    return res.status(201).json(newUser);
  } catch (error) {
    // Handle specific error cases
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      console.error("Duplicate Index_No:", Index_No);
      return res.status(400).json({ message: "Index_No must be unique" });
    }

    console.error("Error adding user:", error.message);
    // Catch all other errors
    return res
      .status(500)
      .json({ message: "There was an error saving the user" });
  }
});

app.get("/api/attendance-list", async (req, res) => {
  try {
    const { course_name } = req.query;
    const response = await fetch(
      `${process.env.LOCALHOST_SERVER}/getUsers?course_name=${course_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return res
        .status(400)
        .json({ message: "Error occurred fetching data from the database" });
    }

    const data = await response.json();
    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    console.log("Error from Backend:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
