import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/config.js";

export async function searchMoviesByName(query: string, page = 1) {
    if (!query) {
        throw new Error("Query parameter is required");
    }
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    if (result.Response === "False") {
        throw new Error(result.Error || `No results found for query=${query}`)
    };


    return {
        totalResults: parseInt(result.totalResults, 10),
        movies: result.Search.map((movie: any) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster,
        })),
    };
}

export async function searchMoviesById(id: string) {
    if (!id) {
        throw new Error("ID parameter is required");
    }
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    if (result.Response === "False") {
        throw new Error(result.Error || `No results found for id=${id}`);
    };
    return result
};