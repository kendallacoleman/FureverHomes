import React, { useState } from "react";
import { searchPets } from "../api";

export default function SearchPage() {
  const [type, setType] = useState("dog");
  const [location, setLocation] = useState("20001");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchPets({ type, location });
      setPets(data.animals || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Search Pets</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Type (dog/cat)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (zip)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pets.map((pet) => (
          <div key={pet.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
            <h3>{pet.name}</h3>
            <p>{pet.age} {pet.gender}</p>
            <p>{pet.breeds.primary}</p>
            {pet.photos[0] && <img src={pet.photos[0].medium} alt={pet.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}
