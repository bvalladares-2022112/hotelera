
import { useState, useEffect } from 'react';
import './Home.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { getAllHotels } from '../../services/api';

export const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await getAllHotels(token);
                if (!response.error) {
                    setHotels(response.data.hotels);
                } else {
                    // Manejar el error
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
                // Manejar el error
            }
        };
        fetchHotels();
    }, []);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="search-bar">
                <button
                    className={`search-button ${selectedFilter === 'Rating' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Rating')}
                >
                    Rating
                </button>
                <button
                    className={`search-button ${selectedFilter === 'Amenities' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Amenities')}
                >
                    Amenities
                </button>
                <button
                    className={`search-button ${selectedFilter === 'Location' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Location')}
                >
                    Location
                </button>
                <button className="search-main-button">Search</button>
            </div>
            <div className="hotel-cards">
                {hotels.map((hotel, index) => (
                    <div className="hotel-card" key={index}>
                        <div className="hotel-image-container">
                            <img src={hotel.imageURL} alt={hotel.name} className="hotel-image" />
                        </div>
                        <div className="hotel-info">
                            <h2>{hotel.name}</h2>
                            <div className="rating">Rating: {hotel.rating}</div>
                            <div className="location">Location: {hotel.location}</div>
                            {/* Agregar más información del hotel aquí */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};