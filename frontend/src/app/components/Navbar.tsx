"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState("");

  const submit = () => onSearch(value);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/60">
      <div className="bg-gray-800 p-4 text-white flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition">
          🎬 Ymoovie
        </Link>

        <div className="flex items-center gap-2 px-4">
          <input
            className="px-3 py-1 rounded text-white"
            type="text"
            placeholder="Enter movie..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button
            className="rounded hover:bg-gray-600 px-3 py-1"
            onClick={submit}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}