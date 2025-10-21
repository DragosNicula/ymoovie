export const dynamic = "force-dynamic";
export const revalidate = 0;

import MovieClient from "./MovieClient";

export default function MoviePage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams?.id ?? "";
  return <MovieClient id={id} />;
}