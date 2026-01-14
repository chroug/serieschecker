"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (text.trim() === "") {
      router.push("/");
    } else {
      router.push(`/?query=${encodeURIComponent(text)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Rechercher une série..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "12px", flex: 1, borderRadius: "8px", border: "none", color: "black", fontSize: "16px", backgroundColor: "white" }}
      />
      <button type="submit" style={{ padding: "12px 24px", cursor: "pointer", borderRadius: "8px", border: "none", backgroundColor: "#e50914", color: "white", fontWeight: "bold" }}>
        🔍
      </button>
    </form>
  );
}