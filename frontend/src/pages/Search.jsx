import React, { useState } from 'react';
import api from '../api';
import PetCard from '../components/PetCard';
import '../styles/Search.css';

function Search() { 
    const [searchParams, setSearchParams] = useState({
        type: '',
        location: '',
        size: '',
        gender: '',
        age: ''
    });
    
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const searchPets = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const validParams = Object.fromEntries(
            Object.entries(searchParams).filter(([, value]) => value !== '')
        );

        try {
            console.log("Sending request to:", api.defaults.baseURL + "/api/search/");
            const response = await api.get('/api/search/', { 
                params: validParams 
            });
            
            if (response.status === 200) {
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

    // Call backend favorite API when toggling
    const handleFavoriteToggle = async (petId) => {
        try {
            await api.post(`/api/favorites/toggle/`, { pet_id: petId });
            // update local state to reflect change
            setPets((prev) =>
                prev.map((p) => p.id === petId ? { ...p, is_favorite: !p.is_favorite } : p)
            );
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };
    
    return (
        <div className="search-page-container">
            <div className="search-info">
                <h1>Find Your Furever Friend 🐾</h1>
                <p>To begin your search, please enter the zip code or city in which you are searching in. 
                    <br/>From there, you can add addition filters from the dropdowns below.</p>
            </div>
            

            <form onSubmit={searchPets} className="search-form">

                <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Location (ZIP or city)"
                />

                <select name="type" value={searchParams.type} onChange={handleInputChange}>
                    <option value="">Select Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="bird">Bird</option>
                </select>

                <select name="age" value={searchParams.age} onChange={handleInputChange}>
                    <option value="">Select Age</option>
                    <option value="baby">Baby</option>
                    <option value="young">Young</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                </select>

                <select name="gender" value={searchParams.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select name="size" value={searchParams.size} onChange={handleInputChange}>
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search Pets'}
                </button>
            </form>

            <div className="results-container">
                {error && <p className="error-message">{error}</p>}
                {loading && <p>Loading results...</p>}
                {!loading && pets.length === 0 && <p>No pets found. Adjust filters and try again.</p>}

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

export default Search;
