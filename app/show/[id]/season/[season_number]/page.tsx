import Link from "next/link";
import EpisodeItem from "../../../../components/EpisodeItem";

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


<div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
  {season.episodes.map((episode: any) => (
    // On appelle notre nouveau composant interactif
    <EpisodeItem key={episode.id} episode={episode} />
  ))}
</div>
      </div>

  );
}