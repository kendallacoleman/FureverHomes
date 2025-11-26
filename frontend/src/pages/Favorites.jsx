import { useEffect, useState } from "react";
import api from "../api";
import PetCard from "../components/PetCard";
import "../styles/Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await api.get("/favorites/");
        const favoritesList = res.data;

        // Fetch full pet details for each favorite
        const petDetailsPromises = favoritesList.map(async (fav) => {
          try {
            const petRes = await api.get(`/animal/${fav.pet_id}/`);
            return petRes.data.animal;
          } catch (err) {
            console.error(`Failed to fetch pet ${fav.pet_id}:`, err);
            // Return basic info if fetch fails
            return {
              id: fav.pet_id,
              name: fav.pet_name,
              type: "Unknown",
              age: "Unknown",
              gender: "Unknown",
            };
          }
        });

        const petsData = await Promise.all(petDetailsPromises);
        setFavorites(petsData);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (petId, newState) => {
    console.log(`Favorite toggled for pet ${petId}: ${newState}`);
    if (!newState) {
      // Pet was unfavorited, remove from list
      setFavorites((prev) => prev.filter((pet) => String(pet.id) !== String(petId)));
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <h1>Your Favorite Pets</h1>
        <p>Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <h1>Your Favorite Pets</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h1>Your Favorite Pets</h1>
        <div className="empty-state">
          <p>No favorites yet! Start searching for pets and add them to your favorites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>Your Favorite Pets</h1>
      <div className="pet-grid">
        {favorites.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
}