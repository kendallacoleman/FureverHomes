// import { useState } from 'react';

// export default function Search() {
//     const [query, setQuery] = useState('');
//     const [location, setLocation] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState(null);

//     async function handleSearch(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const params = new URLSearchParams({
//         q: query,
//         location: location,
//       });

//       const response = await fetch(`http://localhost:8000/api/search/?${params}`);
//       const data = await response.json();

//       if (response.ok) {
//         setResults(data.animals || []);
//       } else {
//         setError(data.error || "Something went wrong.");
//       }
//     } catch (err) {
//       setError("Network error, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">🐾 Find Your Furever Friend 🐾</h1>

//       <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-8">
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Type of pet (dog, cat, etc.)"
//           className="border border-gray-300 rounded p-2 flex-1"
//         />
//         <input
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Location (e.g., Harrisonburg, VA)"
//           className="border border-gray-300 rounded p-2 flex-1"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition"
//         >
//           Search
//         </button>
//       </form>

//       {loading && <p className="text-center">Loading pets...</p>}
//       {error && <p className="text-red-600 text-center">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.map((pet) => (
//           <div key={pet.id} className="border rounded-lg shadow p-3 bg-white">
//             <img
//               src={pet.photos?.[0]?.medium || "https://placekitten.com/400/300"}
//               alt={pet.name}
//               className="w-full h-56 object-cover rounded-md"
//             />
//             <h2 className="text-lg font-semibold mt-2">{pet.name}</h2>
//             <p className="text-gray-700 text-sm">
//               {pet.breeds?.primary || "Unknown Breed"}
//             </p>
//             <p className="text-gray-500 text-sm">
//               {pet.contact?.address?.city || "Unknown location"}
//             </p>
//           </div>
//         ))}
//       </div>

//       {!loading && results.length === 0 && (
//         <p className="text-center text-gray-600 mt-6">No pets found yet — try searching!</p>
//       )}
//     </div>
//   );
// }
import React, { useState } from 'react';
import api from '../api'; // Your configured Axios instance
import PetCard from '../components/PetCard'; // The dedicated card component
import '../styles/Search.css'; // Using the CSS file for styling

function Search() { 
    // Consolidated state for search criteria
    const [searchParams, setSearchParams] = useState({
        type: '',
        location: '',
        size: '',
        gender: ''
    });
    
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handler for changes in the form inputs
    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    // Function to fetch the pets from the Django API endpoint
    const searchPets = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Filter out empty search parameters
        const validParams = Object.fromEntries(
            Object.entries(searchParams).filter(([, value]) => value !== '')
        );

        try {
            // Use the cleaner, configured Axios instance (api)
            const response = await api.get('/api/search/', { 
                params: validParams 
            });
            
            if (response.status === 200) {
                console.log('API Response Data:', response.data);
                setPets(response.data.animals || []); 
            } else {
                 setError(response.data.error || "Search failed with an unknown error.");
            }

        } catch (err) {
            console.error("Search failed:", err);
            setError("Failed to fetch pets. Please check your connection.");
            setPets([]);

        } finally {
            setLoading(false);
        }
    };

    // Placeholder function passed to PetCard for favoriting
    const handleFavoriteToggle = (petId) => {
        // This is where you would call the protected API to save/unsave a favorite
        console.log(`Toggling favorite status for pet ID: ${petId}`);
    };
    
    // --- RENDER FUNCTION ---
    return (
        <div className="search-page-container">
            <h1>Find Your Furever Friend 🐾</h1>

            {/* Search Form */}
            <form onSubmit={searchPets} className="search-form">
                
                {/* Type Selector */}
                <select name="type" value={searchParams.type} onChange={handleInputChange}>
                    <option value="">Select Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="bird">Bird</option>
                </select>

                {/* Location Input */}
                <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Location (Zip Code or City)"
                />

                {/* Size Selector */}
                <select name="size" value={searchParams.size} onChange={handleInputChange}>
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>

                {/* Gender Selector */}
                <select name="gender" value={searchParams.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search Pets'}
                </button>
            </form>

            {/* Display Area */}
            <div className="results-container">
                {error && <p className="error-message">{error}</p>}
                
                {loading && <p>Loading results...</p>}

                {!loading && pets.length === 0 && (
                    <p className="initial-message">No pets found yet — adjust your filters and try searching!</p>
                )}

                {!loading && pets.length > 0 && (
                    <div className="pet-list-grid">
                        {pets.map((pet) => (
                            <PetCard 
                                key={pet.id} 
                                pet={pet} 
                                onFavoriteToggle={handleFavoriteToggle} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Export the component with the correct name
export default Search;