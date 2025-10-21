"use client"

import Link from "next/link";

type MovieCardProps = {
  id: string;
  title: string;
  year: string;
  type?: string;
  poster?: string;
}

const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Poster&font=roboto";

const normalizePoster = (url?: string) => {
  if (!url || url === "N/A") return FALLBACK_POSTER;
  return url.startsWith("http://") ? url.replace("http://", "https://") : url;
};


export default function MovieCard({ id, title, year, type, poster }: MovieCardProps) {
  const src = normalizePoster(poster);

  return (
    <Link href={{ pathname: "/movie/[id]", query: { id } }} className="block">
      <article
        className="bg-gray-800 rounded-xl overflow-hidden shadow transition
           hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
        tabIndex={0}
      >
        <div className="aspect-[2/3]">
          <img
            src={src}
            alt={`Poster for ${title} (${year})`}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_POSTER;
            }}
          />
        </div>

        <div className="p-3 space-y-1.5">
          <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{year}</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-700 uppercase text-gray-400">
              {type ?? "movie"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}