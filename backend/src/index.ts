import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ymoovie.vercel.app" 
  ]
}));

app.use("/movies", movieRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ The server is running on port: ${PORT}`);
});
