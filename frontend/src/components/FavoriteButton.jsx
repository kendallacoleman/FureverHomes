import { useState, useEffect } from "react";
import api from "../api";
import "../styles/FavoriteButton.css";

export default function FavoriteButton({ petId, petName, onToggle }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if pet is favorited on mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await api.get('/favorites/');
        const favorites = res.data;
        const isFav = favorites.some(fav => String(fav.pet_id) === String(petId));
        console.log(`Checking favorite for pet ${petId}: ${isFav}`, favorites);
        setIsFavorited(isFav);
      } catch (err) {
        console.error("Failed to check favorite status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [petId]);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isFavorited) {
        // Remove from favorites
        const res = await api.get('/favorites/');
        const favorite = res.data.find(fav => String(fav.pet_id) === String(petId));
        if (favorite) {
          await api.delete(`/favorites/${favorite.id}/`);
          console.log(`Removed favorite: ${petId}`);
        }
      } else {
        // Add to favorites
        await api.post('/favorites/', {
          pet_id: String(petId),
          pet_name: petName
        });
        console.log(`Added favorite: ${petId}`);
      }
      
      const newState = !isFavorited;
      setIsFavorited(newState);
      
      // Call parent callback if provided
      if (onToggle) {
        onToggle(petId, newState);
      }
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