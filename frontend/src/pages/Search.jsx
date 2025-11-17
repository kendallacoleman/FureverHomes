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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pagination, setPagination] = useState(null);

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const searchPets = async (e, page = 1) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        const validParams = Object.fromEntries(
            Object.entries(searchParams).filter(([, value]) => value !== '')
        );

        // Add page to params
        validParams.page = page;

        console.log("Requesting:", api.defaults.baseURL + "/search/", validParams);
        try {
            const response = await api.get('/search/', { 
                params: validParams 
            });
            
            if (response.status === 200) {
                setPets(response.data.animals || []); 
                setPagination(response.data.pagination || null);
                setCurrentPage(page);
                
                // Calculate total pages from pagination data
                if (response.data.pagination) {
                    const total = response.data.pagination.total_pages || 
                                 Math.ceil(response.data.pagination.total_count / 12) || 
                                 1;
                    setTotalPages(total);
                }
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && !loading) {
            searchPets(null, newPage);
            // Scroll to top of results
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleFavoriteToggle = async (petId) => {
        try {
            await api.post(`/favorites/toggle/`, { pet_id: petId });
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
                    <>
                        <div className="results-info">
                            <p>Showing page {currentPage} of {totalPages}</p>
                            {pagination && pagination.total_count && (
                                <p className="total-results">{pagination.total_count} total results</p>
                            )}
                        </div>

                        <div className="pet-list-grid">
                            {pets.map((pet) => (
                                <PetCard 
                                    key={pet.id} 
                                    pet={pet} 
                                    onFavoriteToggle={handleFavoriteToggle} 
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1 || loading}
                                >
                                    First
                                </button>
                                
                                <button 
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                >
                                    Previous
                                </button>

                                <div className="pagination-info">
                                    <span className="page-numbers">
                                        {/* Show page numbers */}
                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNum = index + 1;
                                            // Show first page, last page, current page, and pages around current
                                            if (
                                                pageNum === 1 ||
                                                pageNum === totalPages ||
                                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        disabled={loading}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            } else if (
                                                pageNum === currentPage - 2 ||
                                                pageNum === currentPage + 2
                                            ) {
                                                return <span key={pageNum} className="pagination-ellipsis">...</span>;
                                            }
                                            return null;
                                        })}
                                    </span>
                                </div>

                                <button 
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                >
                                    Next
                                </button>

                                <button 
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages || loading}
                                >
                                    Last
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;