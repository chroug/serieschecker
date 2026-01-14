import Link from "next/link";

async function getShowDetails(id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Série introuvable");
  return res.json();
}

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = await getShowDetails(id);

  return (
    <div style={{ backgroundColor: "#141414", color: "white", minHeight: "100vh", paddingBottom: "40px" }}>
      
      {/* BOUTON RETOUR */}
      <div style={{ padding: "20px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#aaa", fontSize: "14px" }}>
          ← Retour à l'accueil
        </Link>
      </div>

      {/* HEADER */}
      <div style={{ 
        position: "relative", 
        height: "50vh", 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #141414, transparent)" }}></div>
        <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 4px black" }}>{show.name}</h1>
            <div style={{ display: "flex", gap: "15px", marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
                <span style={{ color: "#46d369" }}>{show.vote_average.toFixed(1)}/10</span>
                <span>{show.first_air_date.split("-")[0]}</span>
                <span>{show.number_of_seasons} Saisons</span>
            </div>
        </div>
      </div>

      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {/* SYNOPSIS */}
        <h2 style={{ borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "10px" }}>Synopsis</h2>
        <p style={{ lineHeight: "1.6", color: "#ccc", marginBottom: "40px" }}>{show.overview || "Aucun résumé disponible."}</p>
        
    
        <h2 style={{ borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>Saisons</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
         {show.seasons.map((season: any) => (
  <Link 
    key={season.id} 
    href={`/show/${show.id}/season/${season.season_number}`}
    style={{ textDecoration: "none", color: "white" }}
  >
    <div style={{ display: "flex", gap: "20px", backgroundColor: "#222", padding: "10px", borderRadius: "10px", alignItems: "center", transition: "background 0.2s" }}>

      <div style={{ flexShrink: 0 }}>
          {season.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w200${season.poster_path}`} alt={season.name} style={{ width: "60px", borderRadius: "5px" }} />
          ) : (
            <div style={{ width: "60px", height: "90px", background: "#333", borderRadius: "5px" }}></div>
          )}
      </div>

      {/* Infos */}
      <div>
        <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>{season.name}</h3>
        <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>
          {season.episode_count} Épisodes • {season.air_date?.split("-")[0]}
        </p>
      </div>
    </div>
  </Link>
))}
        </div>

      </div>
    </div>
  );
}