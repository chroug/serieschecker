"use client";

import { useState } from "react";

export default function EpisodeItem({ episode }: { episode: any }) {
  const [isWatched, setIsWatched] = useState(false);

  const toggleWatched = () => {
    setIsWatched(!isWatched);
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        gap: "20px", 
        backgroundColor: isWatched ? "#1a2e1a" : "#222", 
        borderRadius: "10px", 
        overflow: "hidden", 
        transition: "all 0.3s",
        border: isWatched ? "1px solid #46d369" : "1px solid transparent"
      }}
    >
      
      {/* ZONE IMAGE (Cliquable aussi) */}
      <div 
        onClick={toggleWatched}
        style={{ flexShrink: 0, width: "160px", cursor: "pointer", position: "relative" }}
      >
        {episode.still_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} 
            alt={episode.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isWatched ? 0.6 : 1 }} 
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#333" }}></div>
        )}
        
        {/* Gros Check vert sur l'image si vu */}
        <div style={{ 
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "40px", opacity: isWatched ? 1 : 0, transition: "opacity 0.2s"
        }}>
            ✅
        </div>
      </div>

      {/* ZONE TEXTE */}
      <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", color: isWatched ? "#46d369" : "white" }}>
            {episode.episode_number}. {episode.name}
          </h3>
          <span style={{ fontSize: "12px", color: "#aaa" }}>⭐ {episode.vote_average.toFixed(1)}</span>
        </div>

        {/* LE NOUVEAU BOUTON VISIBLE ICI 👇 */}
        <button 
          onClick={toggleWatched}
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            padding: "8px 12px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: isWatched ? "#46d369" : "#444",
            color: isWatched ? "black" : "white",
            fontWeight: "bold",
            width: "fit-content",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          {isWatched ? "✅ Vu" : "👁️ Marquer comme vu"}
        </button>

        <p style={{ fontSize: "13px", color: "#ccc", margin: 0, lineHeight: "1.4" }}>
          {episode.overview ? (episode.overview.length > 150 ? episode.overview.substring(0, 150) + "..." : episode.overview) : "Pas de résumé."}
        </p>
      </div>

    </div>
  );
}