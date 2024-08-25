import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: `${process.env.LOCALHOST_CLIENT}`,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  })
);
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// parse application/json

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
// const course_name = "csm 377";

const mongoConnection = async (req, res) => {
  const { course_name } = req.query || req.body;
  console.log("COURSE NAME FROM CONNECTION query: ", req.query);
  console.log("COURSE NAME FROM CONNECTION body: ", req.body);

  const url_mongo = `mongodb+srv://solution:solution17@cluster0.udyro6p.mongodb.net/${course_name}?retryWrites=true&w=majority&appName=Cluster0`;
  mongoose
    .connect(url_mongo)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => console.log("Database connection error:", error));
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
    console.log("USER DATA: ", userData);
    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addUser", async (req, res) => {
  console.log("Request received at /addUser:", req.body);

  const { name, Index_No, course_name } = req.body;
  console.log(name, " : ", Index_No, " : ", course_name);

  // Validate the request body
  if (!name || !Index_No) {
    console.log("Validation failed: Missing name or Index_No");
    return res.status(400).json({ message: "Name and Index_No are required" });
  }

  try {
    // Create a new user
    const newUser = new UserModel({ name, Index_No });
    await newUser.save();

    console.log("User saved successfully:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    // Handle specific error cases
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.status(400).json({ message: "Index_No must be unique" });
    }

    console.error("Error adding user:", error.message);
    res.status(500).json({ message: "There was an error saving the user" });
  }
});

app.get("/api/attendance-list", async (req, res) => {
  try {
    const { course_name } = req.query;
    console.log("COURSE NAME: ", course_name);
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
      console.log("Error occur");
      return res
        .status(400)
        .json({ message: "Error occur fetching data from database" });
    }
    const data = await response.json();
    // console.log("JSON RESPONSE: ", data);

    return res.status(200).json({ message: "success", data: data });
  } catch (error) {
    console.log("Error from Backend");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
