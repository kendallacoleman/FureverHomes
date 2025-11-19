import { useState, useEffect } from "react";
import api from "../api";
import "../styles/FavoriteButton.css";

export default function FavoriteButton({ petId, petName, initialFavorited = false }) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(true);

  // Check if pet is favorited on mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await api.get('/favorites/');
        const favorites = res.data;
        const isFav = favorites.some(fav => fav.pet_id === petId);
        setIsFavorited(isFav);
      } catch (err) {
        console.error("Failed to check favorite status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [petId]);

  const handleToggle = async () => {
    try {
      if (isFavorited) {
        // Remove from favorites
        const res = await api.get('/favorites/');
        const favorite = res.data.find(fav => fav.pet_id === petId);
        if (favorite) {
          await api.delete(`/favorites/${favorite.id}/`);
        }
      } else {
        // Add to favorites
        await api.post('/favorites/', {
          pet_id: petId,
          pet_name: petName
        });
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Failed to update favorite. Please try again.");
    }
  };

  if (loading) {
    return (
      <button className="favorite-button" disabled>
        ⏳
      </button>
    );
  }

  return (
    <button 
      className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
      onClick={handleToggle}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorited ? '❤️' : '🤍'}
    </button>
  );
}