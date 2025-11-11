import { useEffect, useState } from "react";
import api from "../api";
import PetCard from "../components/PetCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites/");
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, []);

  if (favorites.length === 0) return <div>No favorites yet!</div>;

  return (
    <div>
      <h1>Your Favorite Pets</h1>
      <div className="pet-grid">
        {favorites.map((fav) => (
          <PetCard
            key={fav.pet_id}
            pet={{ id: fav.pet_id, name: fav.pet_name }}
          />
        ))}
      </div>
    </div>
  );
}
