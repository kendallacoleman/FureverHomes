import { useState } from 'react';

export default function Search() {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        location: location,
      });

      const response = await fetch(`http://localhost:8000/api/search/?${params}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.animals || []);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🐾 Find Your Furever Friend 🐾</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type of pet (dog, cat, etc.)"
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., Harrisonburg, VA)"
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading pets...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((pet) => (
          <div key={pet.id} className="border rounded-lg shadow p-3 bg-white">
            <img
              src={pet.photos?.[0]?.medium || "https://placekitten.com/400/300"}
              alt={pet.name}
              className="w-full h-56 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{pet.name}</h2>
            <p className="text-gray-700 text-sm">
              {pet.breeds?.primary || "Unknown Breed"}
            </p>
            <p className="text-gray-500 text-sm">
              {pet.contact?.address?.city || "Unknown location"}
            </p>
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No pets found yet — try searching!</p>
      )}
    </div>
  );
}