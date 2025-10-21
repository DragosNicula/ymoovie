import { Router } from "express";
import { getMoviesByName, getMoviesById } from "../controllers/movieController.js";

const router = Router();

router.get("/search", getMoviesByName);
router.get("/:id", getMoviesById);

export default router;