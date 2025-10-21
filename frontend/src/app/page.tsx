"use client";

import { useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieCardSkeleton from "./components/MovieCardSkeleton";
import Navbar from './components/Navbar'

type Movie = {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<number | null>(null);
  const isFirstPageLoading = loading && loadingPage === 1;

  const handleSearch = async (query: string, page = 1) => {
    if (!query.trim()) { setError("Please enter a name for the movie"); return; }

    setLoading(true);
    setLoadingPage(page);
    setError(null);

    const URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/movies/search?query=${encodeURIComponent(query)}&page=${page}`;

    try {
      const response = await fetch(URL);
      if (!response.ok) { setError("Server is not available"); return; }

      const result = await response.json();
      const newMovies = Array.isArray(result.data) ? result.data : [];

      setMovies(prev => (page === 1 ? newMovies : [...prev, ...newMovies]));

      const nextPage = result.meta?.currentPage ?? page;
      setCurrentPage(nextPage);
      setLastQuery(query);
    } catch (e) {
      setError("Unexpected error. Check the console.");
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingPage(null);      
    }
  };


  const showHero = !lastQuery && !loading && movies.length === 0 && !error;

  return (
    <div className="p-4">
      <Navbar onSearch={(q: string) => handleSearch(q, 1)} />

      {showHero && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Welcome to YMoovie 🎬
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Search for movies using the bar above!
          </p>
        </div>
      )}

      {error && (
        <div className="max-w-6xl mx-auto px-4">
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 p-3 flex items-center justify-between">
            <span>{error}</span>
            {lastQuery && (
              <button
                onClick={() => handleSearch(lastQuery, currentPage || 1)}
                className="px-3 py-1 rounded bg-red-600/30 hover:bg-red-600/40"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isFirstPageLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <li key={`skeleton-${i}`}><MovieCardSkeleton /></li>
            ))}

          {!isFirstPageLoading &&
            movies.map((m: Movie, i: number) => (
              <li key={m.id + "-" + i} className="border border-gray-700 rounded p-4">
                <MovieCard
                  id={m.id}
                  title={m.title}
                  year={m.year}
                  type={m.type}
                  poster={m.poster}
                />
              </li>
            ))}
        </ul>
      </div>

      {lastQuery && (
        <button
          onClick={() => handleSearch(lastQuery, currentPage + 1)}
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-gray-800 backdrop-blur-md text-gray-200 font-semibold border border-purple-400/30 hover:bg-gray-600/40 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}