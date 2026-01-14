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
  // On attend que les paramètres soient prêts (spécifique aux dernières versions Next.js)
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

      {/* HEADER AVEC IMAGE DE FOND (BACKDROP) */}
      <div style={{ 
        position: "relative", 
        height: "50vh", 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        {/* Un petit dégradé noir pour que le texte soit lisible */}
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

      {/* CONTENU (SYNOPSIS) */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "10px" }}>Synopsis</h2>
        <p style={{ lineHeight: "1.6", color: "#ccc" }}>{show.overview || "Aucun résumé disponible."}</p>
        
        {/* Ici, on ajoutera la liste des saisons plus tard */}
      </div>

    </div>
  );
}