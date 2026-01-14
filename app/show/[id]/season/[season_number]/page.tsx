import Link from "next/link";

async function getSeasonDetails(showId: string, seasonNumber: string) {
  const apiKey = process.env.TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${apiKey}&language=fr-FR`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Saison introuvable");
  return res.json();
}

export default async function SeasonPage({ 
  params 
}: { 
  params: Promise<{ id: string; season_number: string }> 
}) {
  // On récupère les deux infos de l'URL
  const { id, season_number } = await params;
  const season = await getSeasonDetails(id, season_number);

  return (
    <div style={{ backgroundColor: "#141414", color: "white", minHeight: "100vh", padding: "20px" }}>
      
      {/* Bouton Retour à la série */}
      <Link href={`/show/${id}`} style={{ textDecoration: "none", color: "#aaa", fontSize: "14px", display: "block", marginBottom: "20px" }}>
        ← Retour à la série
      </Link>

      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{season.name}</h1>
      <p style={{ color: "#888", marginBottom: "30px" }}>Sortie en {season.air_date?.split("-")[0]} • {season.episodes.length} épisodes</p>

      {/* LISTE DES ÉPISODES */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
        {season.episodes.map((episode: any) => (
          <div key={episode.id} style={{ display: "flex", gap: "20px", backgroundColor: "#222", borderRadius: "10px", overflow: "hidden" }}>
            
            {/* Image de l'épisode (Still) */}
            <div style={{ flexShrink: 0, width: "160px" }}>
              {episode.still_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} 
                  alt={episode.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#333", display:"flex", alignItems:"center", justifyContent:"center", color: "#555" }}>Sans image</div>
              )}
            </div>

            {/* Infos épisode */}
            <div style={{ padding: "15px", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                  {episode.episode_number}. {episode.name}
                </h3>
                <span style={{ fontSize: "12px", color: "#aaa" }}>⭐ {episode.vote_average.toFixed(1)}</span>
              </div>
              
              <p style={{ fontSize: "13px", color: "#ccc", margin: "5px 0 0 0", lineHeight: "1.4" }}>
                {episode.overview ? (episode.overview.length > 150 ? episode.overview.substring(0, 150) + "..." : episode.overview) : "Pas de résumé."}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}