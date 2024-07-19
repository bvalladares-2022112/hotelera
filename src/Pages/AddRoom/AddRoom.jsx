import React, { useState, useEffect } from 'react';
import './AddRoom.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { toast } from 'react-hot-toast';

export const AddRoom = () => {
    const [typeOfRoom, setTypeOfRoom] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [type, setType] = useState('');
    const [hotel, setHotel] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rooms, setRooms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(null);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        if (typeOfRoom || price || location || organizer || type || hotel || imageUrl) {
            setIsFormDirty(true);
        } else {
            setIsFormDirty(false);
        }
    }, [typeOfRoom, price, location, organizer, type, hotel, imageUrl]);

    const handleAddRoom = (e) => {
        e.preventDefault();
        if (typeOfRoom && price && location && organizer && type && hotel && isValidUrl(imageUrl)) {
            const newRoom = { typeOfRoom, price, location, organizer, type, hotel, imageUrl };
            if (isEditing) {
                const updatedRooms = rooms.map((room, index) => index === currentRoomIndex ? newRoom : room);
                setRooms(updatedRooms);
                setIsEditing(false);
                setCurrentRoomIndex(null);
                toast.success('Room updated successfully!');
            } else {
                setRooms([...rooms, newRoom]);
                toast.success('Room added successfully!');
            }
            handleCancel(); // Reset form fields and state
        } else {
            toast.error('All fields must be filled out and image URL must be a valid URL');
        }
    };

    const handleCancel = () => {
        setTypeOfRoom('');
        setPrice('');
        setLocation('');
        setOrganizer('');
        setType('');
        setHotel('');
        setImageUrl('');
        setIsEditing(false);
        setCurrentRoomIndex(null);
        setIsFormDirty(false);
    };

    const handleEditRoom = (index) => {
        const room = rooms[index];
        setTypeOfRoom(room.typeOfRoom);
        setPrice(room.price);
        setLocation(room.location);
        setOrganizer(room.organizer);
        setType(room.type);
        setHotel(room.hotel);
        setImageUrl(room.imageUrl);
        setIsEditing(true);
        setCurrentRoomIndex(index);
    };

    const handleDeleteRoom = (index) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            const updatedRooms = [...rooms];
            updatedRooms.splice(index, 1);
            setRooms(updatedRooms);
            toast.success('Room deleted successfully!');
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Permitir solo números
            setPrice(value);
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    return (
        <>
            <Navbar />
            <div className="add-room-container">
                <header className="profile-header">
                    <h1>{isEditing ? 'Edit Room' : 'Add Room'}</h1>
                </header>
                <div className="content">
                    <div className="form-container">
                        <form className="add-room-form" onSubmit={handleAddRoom}>
                            <label>Type of room</label>
                            <input type="text" placeholder="Type of room" value={typeOfRoom} onChange={(e) => setTypeOfRoom(e.target.value)} />
                            <label>Price</label>
                            <input type="text" placeholder="Price" value={price} onInput={handlePriceChange} />
                            <label>Location</label>
                            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <label>Organizer</label>
                            <input type="text" placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
                            <label>Type</label>
                            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                            <label>Hotel</label>
                            <input type="text" placeholder="Hotel" value={hotel} onChange={(e) => setHotel(e.target.value)} />
                            <label>Image URL</label>
                            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                            <div className="button-group">
                                <button type="submit" className="add-room-button">{isEditing ? 'Update room' : 'Add room'}</button>
                                {(isFormDirty || isEditing) && (
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="rooms-container">
                        <h2>Your Rooms</h2>
                        {rooms.map((room, index) => (
                            <div className="room-card" key={index}>
                                <img src={room.imageUrl} alt={room.typeOfRoom} />
                                <h3>{room.typeOfRoom}</h3>
                                <p className="room-label">Price<br /><span className="room-detail">{room.price}</span></p>
                                <p className="room-label">Location<br /><span className="room-detail">{room.location}</span></p>
                                <p className="room-label">Organizer<br /><span className="room-detail">{room.organizer}</span></p>
                                <p className="room-label">Type<br /><span className="room-detail">{room.type}</span></p>
                                <p className="room-label">Hotel<br /><span className="room-detail">{room.hotel}</span></p>
                                <div className="button-group">
                                    <button className="edit-button" onClick={() => handleEditRoom(index)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteRoom(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
