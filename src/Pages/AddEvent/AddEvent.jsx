import React, { useState, useEffect } from 'react';
import './AddEvent.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { toast } from 'react-hot-toast';
import { getDetailsUser } from '../../services/api';

export const AddEvent = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [type, setType] = useState('');
    const [hotel, setHotel] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(null);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [profile, setProfile] = useState({});
    const [initialProfileState, setInitialProfileState] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userDetails = await getDetailsUser();
                    if (userDetails) {
                        setProfile(userDetails);
                        setInitialProfileState(userDetails);
                        if (userDetails.username) {
                            setOrganizer(userDetails.username);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (name || date || location || organizer || type || hotel || imageUrl) {
            setIsFormDirty(true);
        } else {
            setIsFormDirty(false);
        }
    }, [name, date, location, organizer, type, hotel, imageUrl]);

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (name && date && location && organizer && type && hotel && isValidUrl(imageUrl)) {
            const newEvent = { name, date, location, organizer, type, hotel, imageUrl };
            if (isEditing) {
                const updatedEvents = events.map((event, index) => index === currentEventIndex ? newEvent : event);
                setEvents(updatedEvents);
                setIsEditing(false);
                setCurrentEventIndex(null);
                toast.success('Event updated successfully!');
            } else {
                setEvents([...events, newEvent]);
                toast.success('Event added successfully!');
            }
            handleCancel();
        } else {
            toast.error('All fields must be filled out and image URL must be a valid URL');
        }
    };

    const handleCancel = () => {
        setName('');
        setDate('');
        setLocation('');
        setOrganizer(initialProfileState.username || '');
        setType('');
        setHotel('');
        setImageUrl('');
        setIsEditing(false);
        setCurrentEventIndex(null);
        setIsFormDirty(false);
    };

    const handleEditEvent = (index) => {
        const event = events[index];
        setName(event.name);
        setDate(event.date);
        setLocation(event.location);
        setOrganizer(event.organizer);
        setType(event.type);
        setHotel(event.hotel);
        setImageUrl(event.imageUrl);
        setIsEditing(true);
        setCurrentEventIndex(index);
    };

    const handleDeleteEvent = (index) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const updatedEvents = [...events];
            updatedEvents.splice(index, 1);
            setEvents(updatedEvents);
            toast.success('Event deleted successfully!');
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    return (
        <>
            <Navbar />
            <div className="add-events-container">
                <header className='profile-header'>
                    <h1>{isEditing ? 'Edit Event' : 'Add Event'}</h1>
                </header>
                <div className="add-events-content">
                    <div className="add-events-form-container">
                        <form className="add-events-form" onSubmit={handleAddEvent}>
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                            <label>Date</label>
                            <input type="date" placeholder="dd/mm/yyyy" value={date} onChange={(e) => setDate(e.target.value)} />

                            <label>Location</label>
                            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

                            <label>Organizer</label>
                            <input type="text" placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} disabled />

                            <label>Type</label>
                            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />

                            <label>Hotel</label>
                            <input type="text" placeholder="Hotel" value={hotel} onChange={(e) => setHotel(e.target.value)} />

                            <label>Image URL</label>
                            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                            <div className="add-events-button-group">
                                <button type="submit" className="add-events-add-button">{isEditing ? 'Update Event' : 'Add Event'}</button>
                                {(isFormDirty || isEditing) && (
                                    <button type="button" className="add-events-cancel-button" onClick={handleCancel}>Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="add-events-events-container">
                        <h2>Your Events</h2>
                        {events.map((event, index) => (
                            <div className="add-events-event-card" key={index}>
                                <img src={event.imageUrl} alt={event.name} />
                                <h3>{event.name}</h3>
                                <p className="add-events-event-label">Date<br /><span className="add-events-event-detail">{event.date}</span></p>
                                <p className="add-events-event-label">Location<br /><span className="add-events-event-detail">{event.location}</span></p>
                                <p className="add-events-event-label">Organizer<br /><span className="add-events-event-detail">{event.organizer}</span></p>
                                <p className="add-events-event-label">Type<br /><span className="add-events-event-detail">{event.type}</span></p>
                                <p className="add-events-event-label">Hotel<br /><span className="add-events-event-detail">{event.hotel}</span></p>
                                <div className="add-events-button-group">
                                    <button className="edit-button" onClick={() => handleEditEvent(index)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteEvent(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
