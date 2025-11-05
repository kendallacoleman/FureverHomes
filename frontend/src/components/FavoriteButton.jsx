import { useState, useEffect } from "react";
import api from "../api";

export default function FavoriteButton({ petId, petName }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await api.get("/api/favorites/");
        const favorited = res.data.some((f) => f.pet_id === petId);
        setIsFavorite(favorited);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    checkFavorite();
  }, [petId]);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      if (!isFavorite) {
        await api.post("/api/favorites/", { pet_id: petId, pet_name: petName });
        setIsFavorite(true);
      } else {
        // delete favorite
        const res = await api.get("/api/favorites/");
        const favoriteObj = res.data.find((f) => f.pet_id === petId);
        if (favoriteObj) {
          await api.delete(`/api/favorites/${favoriteObj.id}/`);
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      style={{
        backgroundColor: isFavorite ? "#ffcccb" : "#eee",
        border: "1px solid #999",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
    </button>
  );
}
