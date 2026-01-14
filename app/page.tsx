import SearchBar from "./components/SearchBar";
import Link from "next/link";
// Fonction pour récupérer les Séries
async function getShows(query: string | undefined) {
  const apiKey = process.env.TMDB_API_KEY;
  let url;

  if (query) {
    url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=fr-FR&query=${query}`;
  } else {
    url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=fr-FR`;
  }

  const res = await fetch(url, { next: { revalidate: 0 } });
  
  if (!res.ok) throw new Error("Erreur fetch");
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  // Dans les dernières versions de Next.js, searchParams est parfois une Promise
  const params = await searchParams;
  const query = params?.query;
  
  const data = await getShows(query);
  const shows = data.results || [];

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "white", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>
        {query ? `🔍 Résultats pour "${query}"` : "🔥 Tendances Séries"}
      </h1>

      <SearchBar />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {shows.map((show: any) => (
  <Link key={show.id} href={`/show/${show.id}`} style={{ textDecoration: "none", color: "white" }}>
    <div style={{ backgroundColor: "#222", borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" }}>
      {show.poster_path ? (
        <img 
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
          alt={show.name}
          style={{ width: "100%", height: "auto" }} 
        />
      ) : (
        <div style={{ height: "300px", background: "#333", display:"flex", alignItems:"center", justifyContent:"center" }}>Pas d'image</div>
      )}
      <div style={{ padding: "10px" }}>
        <h3 style={{ fontSize: "16px", margin: "0 0 5px 0" }}>{show.name}</h3>
        <p style={{ fontSize: "14px", color: "#aaa", margin: 0 }}>⭐ {show.vote_average?.toFixed(1)}</p>
      </div>
    </div>
  </Link>
))}
      </div>
    </div>
  );
}