import './Navbar.css';
import { useUserDetails } from '../../shared/hooks/useUserDetails.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { isLogged, logoutSys, userDetails } = useUserDetails()

    const handleLogout = ()=>{
        logoutSys()
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/staygo"><span>StayGo</span></a>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                <span className="navbar-toggle-icon">&#9776;</span>
            </button>
            <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <li><a href="/stayGo/Room">Rooms</a></li>
                <li><a href="/stayGo/Reservation">Reservations</a></li>
                <li><a href="/stayGo/Event">Event</a></li>
                <li><a href="/stayGo/AddEvent">Add Event</a></li>
                <li><a href="/stayGo/AddHotel">Add Hotel</a></li>
                <li><a href="/stayGo/AddRoom">Add Room</a></li>
                <div className="navbar-profile">
                    {
                        !isLogged ? (
                            <a href="/stayGo/login" id="navbar-menu-logged">Login</a>
                        ) : (
                            <div className="navbar-profile">
                                <a className='navbar-menu-profile' href="/stayGo/myprofile/:id">My Profile</a>
                                <a href="/stayGo/login" id="navbar-menu-logged" onClick={handleLogout}>Log Out</a>
                            </div>
                        )
                    }
                </div>
            </ul>
        </nav>
    );
}