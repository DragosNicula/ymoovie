"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MovieDetails = {
  Title: string;
  Year: string;
  Genre?: string;
  Plot?: string;
  Poster?: string;
  Director?: string;
  Actors?: string;
};

const FALLBACK_POSTER = "https://placehold.co/500x750?text=No+Poster";

export default function MovieClient({ id }: { id: string }) {
  const router = useRouter();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing movie id.");
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
        const res = await fetch(`${base}/movies/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Failed to load movie");
        const payload = await res.json();
        setMovie(payload.data ?? null);
      } catch (e) {
        console.error(e);
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-400">
        {error ?? "Movie not found."}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-400">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-purple-500 hover:text-purple-400"
      >
        ← Back to results
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img src={poster} alt={movie.Title} className="rounded-xl shadow-lg w-full" />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600">
            {movie.Year}{movie.Genre ? ` • ${movie.Genre}` : ""}
          </p>
          {movie.Plot && <p className="text-gray-400">{movie.Plot}</p>}

          <div className="pt-4 text-sm space-y-1">
            {movie.Director && (
              <p><span className="text-gray-500">Director:</span> {movie.Director}</p>
            )}
            {movie.Actors && (
              <p><span className="text-gray-500">Actors:</span> {movie.Actors}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}