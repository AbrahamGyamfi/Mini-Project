import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import bodyParser from "body-parser";

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// parse application/json

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => console.log("Database connection error:", error));

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

const UserModel = mongoose.model("Users", userSchema);

app.get("/getUsers", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addUser", async (req, res) => {
  console.log("Request received at /addUser:", req.body);
  const { name, Index_No } = req.body;
  if (!name || !Index_No) {
    console.log("Validation failed: Missing name or Index_No");
    return res.status(400).json({ message: "Name and Index_No are required" });
  }
  try {
    const newUser = new UserModel({ name, Index_No });
    await newUser.save();
    console.log("User saved successfully:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "There was an error saving the user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
