import React, { useState, useEffect } from 'react';
import './AddHotel.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { toast } from 'react-hot-toast';

export const AddHotel = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [amenities, setAmenities] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [hotels, setHotels] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        if (name || location || amenities || description || imageUrl) {
            setIsFormDirty(true);
        } else {
            setIsFormDirty(false);
        }
    }, [name, location, amenities, description, imageUrl]);

    const handleAddHotel = (e) => {
        e.preventDefault();
        if (name && location && amenities && description && isValidUrl(imageUrl)) {
            const newHotel = { name, location, amenities, description, imageUrl };
            if (isEditing) {
                const updatedHotels = hotels.map((hotel, index) => index === currentHotelIndex ? newHotel : hotel);
                setHotels(updatedHotels);
                setIsEditing(false);
                setCurrentHotelIndex(null);
                toast.success('Hotel updated successfully!');
            } else {
                setHotels([...hotels, newHotel]);
                toast.success('Hotel added successfully!');
            }
            handleCancel();
        } else {
            toast.error('All fields must be filled out and image URL must be a valid URL');
        }
    };

    const handleCancel = () => {
        setName('');
        setLocation('');
        setAmenities('');
        setDescription('');
        setImageUrl('');
        setIsEditing(false);
        setCurrentHotelIndex(null);
        setIsFormDirty(false);
    };

    const handleEditHotel = (index) => {
        const hotel = hotels[index];
        setName(hotel.name);
        setLocation(hotel.location);
        setAmenities(hotel.amenities);
        setDescription(hotel.description);
        setImageUrl(hotel.imageUrl);
        setIsEditing(true);
        setCurrentHotelIndex(index);
    };

    const handleDeleteHotel = (index) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            const updatedHotels = [...hotels];
            updatedHotels.splice(index, 1);
            setHotels(updatedHotels);
            toast.success('Hotel deleted successfully!');
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    return (
        <>
            <Navbar />
            <div className="add-hotel-container">
            <header className="profile-header">
                <h1>{isEditing ? 'Edit Hotel' : 'Add Hotel'}</h1>
            </header>
                <div className="content">
                    <div className="form-container">

                        <form className="add-hotel-form" onSubmit={handleAddHotel}>
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                            <label>Location</label>
                            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

                            <label>Amenities</label>
                            <input type="text" placeholder="Amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />

                            <label>Description</label>
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <label>Image URL</label>
                            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                            <div className="button-group">
                                <button type="submit" className="add-hotel-button">{isEditing ? 'Update Hotel' : 'Add Hotel'}</button>
                                {(isFormDirty || isEditing) && (
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="hotels-container">
                        <h2>Your Hotels</h2>
                        {hotels.map((hotel, index) => (
                            <div className="hotel-card" key={index}>
                                <img src={hotel.imageUrl} alt={hotel.name} />
                                <h3>{hotel.name}</h3>
                                <p className="hotel-label">Location<br /><span className="hotel-detail">{hotel.location}</span></p>
                                <p className="hotel-label">Amenities<br /><span className="hotel-detail">{hotel.amenities}</span></p>
                                <p className="hotel-label">Description<br /><span className="hotel-detail">{hotel.description}</span></p>
                                <div className="button-group">
                                    <button className="edit-button" onClick={() => handleEditHotel(index)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteHotel(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};