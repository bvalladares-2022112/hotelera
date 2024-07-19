import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Room.css';
import { Navbar } from '../../components/Navbar/Navbar';

export const Room = () => {
    const [activeLink, setActiveLink] = useState('My profile');

    const handleNavClick = (link) => {
        setActiveLink(link);
        // Aquí puedes agregar la lógica para redirigir a la página correspondiente si es necesario
    };

    return (
        <div className="room-container">
            <Navbar />
            <div className="hotel-content">
                <h1 style={{ color: 'black' }}>Hotel</h1>
                <div className="hotel-card">
                    <img src="https://res.cloudinary.com/simpleview/image/upload/v1642787126/clients/loscabosmx/Copia_de_Copia_de_Esperanza_0010x_8dcb97e1-1c39-4cd8-8e36-326ec39d65b3.jpg" alt="Hotel" className="hotel-image" />
                    <div className="hotel-info">
                        <div className="hotel-name">
                            <h2>Red Crown</h2>
                            <div className="rating">★★★★★</div>
                            <div className="location">San Juan Capistrano, CA</div>
                        </div>
                        <div className="hotel-details">
                            <div className="detail">
                                <strong>Trivago</strong>
                            </div>
                            <div className="detail">
                                <strong>Location</strong> <span className="detail-description">Ciudad de Guatemala</span>
                            </div>
                            <div className="detail">
                                <strong>Amenities</strong> <span className="detail-description">Wifi</span>
                            </div>
                            <div className="description">
                                <strong>Description</strong>
                                <p className="detail-description">
                                    Es un refugio de lujo y confort en el corazón de la ciudad, ofreciendo habitaciones elegantes con vistas panorámicas y tecnología de punta. Disfruta de una gastronomía exquisita en nuestros restaurantes, relájate en el spa, nada en la piscina climatizada y mantente en forma en el gimnasio. Nuestro personal profesional y amable está disponible las 24 horas para asegurar una estancia perfecta, brindando servicios de recepción y conserjería. Ubicado cerca de los principales atractivos turísticos y centros de negocios, el Hotel Oasis Resort es tu oasis de lujo y comodidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="section-title">Bedrooms</h2>
                <div className="bedrooms">
                    <div className="bedroom-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTjEgqDmEoNQwJv9wMdzsUHI22wCAYYuH5dgE_w21Sg&s" alt="Double room" />
                        <div className="bedroom-info">
                            <h3>Double room</h3>
                            <p>$72.73</p>
                            <p>This is a room for two people</p>
                        </div>
                    </div>
                    <div className="bedroom-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKODZs_okfgLkVtyq0UvlETFwuD5kdjbzsLFw4W_4Zzg&s" alt="Family room" />
                        <div className="bedroom-info">
                            <h3>Family room</h3>
                            <p>$84.45</p>
                            <p>This is a room for the whole family.</p>
                        </div>
                    </div>
                    <div className="bedroom-card">
                        <img src="https://d11awh6qzkjdxh.cloudfront.net/101/537/es_bcn_0537_027_11.jpg?s=1&w=670&h=435" alt="Single room" />
                        <div className="bedroom-info">
                            <h3>Single room</h3>
                            <p>$42.22</p>
                            <p>This is a room for one person</p>
                        </div>
                    </div>
                </div>
                <h2 className="section-title">Events</h2>
                <div className="events">
                    <div className="event-card">
                        <img src="https://phantom-marca.unidadeditorial.es/79b44ff7f45a0171b4d6b2c7e9b5811a/resize/828/f/jpg/assets/multimedia/imagenes/2023/08/23/16928088810779.jpg" alt="Event 1" />
                        <div className="event-info">
                            <h3>Boda</h3>
                            <p><strong>Date</strong><br/>2024-06-20</p>
                            <p><strong>Location</strong><br/><span className="detail-description">Ciudad de Guatemala</span></p>
                            <p><strong>Organizer</strong><br/>Omar Castillo</p>
                            <p><strong>Type of event</strong><br/>Boda</p>
                            <p><strong>Hotel</strong><br/><span className="detail-description">Hotel Santa Clara</span></p>
                        </div>
                    </div>
                    <div className="event-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCai98piFmiI0NxESboxRyZlmBjPC_ngUW91rWdgkVPQ&s" alt="Event 2" />
                        <div className="event-info">
                            <h3>Baby Shower</h3>
                            <p><strong>Date</strong><br/>2024-06-20</p>
                            <p><strong>Location</strong><br/><span className="detail-description">Ciudad de Guatemala</span></p>
                            <p><strong>Organizer</strong><br/>Omar Castillo</p>
                            <p><strong>Type of event</strong><br/>Baby Shower</p>
                            <p><strong>Hotel</strong><br/><span className="detail-description">Hotel Santa Clara</span></p>
                        </div>
                    </div>
                    <div className="event-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfihrG_wxLAkqWsHkZSTAoH0QGAIUlS3_qy9k7Rj2pwg&s" alt="Event 3" />
                        <div className="event-info">
                            <h3>Fiesta bienvenida</h3>
                            <p><strong>Date</strong><br/>2024-07-25</p>
                            <p><strong>Location</strong><br/><span className="detail-description">Ciudad de Guatemala</span></p>
                            <p><strong>Organizer</strong><br/>Edwin Coy</p>
                            <p><strong>Type of event</strong><br/>Fiesta</p>
                            <p><strong>Hotel</strong><br/><span className="detail-description">Hotel Santa Clara</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}