export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

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

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const res = await fetch(`${base}/movies/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        Could not load movie details.
      </div>
    );
  }

  const payload = await res.json();
  const movie: MovieDetails | null = payload?.data ?? null;

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        Movie not found.
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-400">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-purple-500 hover:text-purple-400"
      >
        ← Back to results
      </Link>

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