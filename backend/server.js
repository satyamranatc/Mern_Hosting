import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbConfig.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","https://www.cockroachunion.in/"],
  credentials: true
}));
app.use(express.json());
// static file for uploads

// Connect to database
connectDB();

let movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

let Movie = mongoose.model("Movie", movieSchema);


// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});


app.get("/movies",async(req,res)=>{
  return res.json({ message: "Movie list is live","movies": await Movie.find() });
  
})




app.post("/movies", async (req,res)=>{

  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  });

  await movie.save();
  return res.json({ message: "Movie is saved!" });
  
})





app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
