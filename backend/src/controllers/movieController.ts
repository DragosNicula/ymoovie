import { searchMoviesByName, searchMoviesById } from "../services/omdbService";
import { NextFunction, Request, Response } from "express";

export const getMoviesByName = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.query as string;
    const currentPage = parseInt(req.query.page as string) || 1;

    if (!query) {
        const error: any = new Error("Missing query");
        error.statusCode = 400;
        return next(error);
    }
    try {
        const { movies, totalResults } = await searchMoviesByName(query, currentPage);
        if (!movies || movies.length === 0) {
            const error: any = new Error("Movie not found");
            error.statusCode = 404;
            return next(error);
        }

        res.json({
            success: true,
            data: movies,
            meta: { currentPage, totalResults }
        });
    } catch (error: any) {
        error.statusCode = error.statusCode || 502;
        next(error);
    }
}

export const getMoviesById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    if (!id) {
        const error: any = new Error("Missing ID");
        error.statusCode = 400;
        return next(error);
    }
    try {
        const movie = await searchMoviesById(id);
        if (!movie) {
            const error: any = new Error("Movie not found");
            error.statusCode = 404;
            return next(error);
        }

        res.json({
            success: true,
            data: movie
        });
    } catch (error: any) {
        error.statusCode = error.statusCode || 502;
        return next(error);
    }
}
