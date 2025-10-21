import express from "express";
import cors from "cors";
import movieRoutes  from "./routes/movieRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { PORT } from "./utils/config.js";

const app = express();
app.use(cors({origin: "http://localhost:3000" }));

app.use("/movies", movieRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ The server is running on port: ${PORT}`);
})