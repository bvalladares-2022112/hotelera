import React from 'react';
import './Event.css'; 
import { Navbar } from '../../components/Navbar/Navbar';

export const Event = () => {
  const eventos = [
    {
      id: 1,
      nombre: 'Boda',
      fecha: '2024-06-20',
      location: 'Ciudad de Guatemala',
      organizer: 'Omar Castillo',
      type: 'Boda',
      hotel: 'Hotel Santa Clara',
      imagen: 'https://cdn0.matrimonio.com.co/article-vendor/7640/original/1280/jpg/79b69546-b5fe-4aa7-bda5-93b5132b2807_10_107640.jpeg'
    },
    {
      id: 2,
      nombre: '15 años',
      fecha: '2024-06-20',
      location: 'Ciudad de Guatemala',
      organizer: 'Omar Castillo',
      type: 'Quinceaños',
      hotel: 'Hotel New Resort',
      imagen: 'https://i.ytimg.com/vi/AcNa1n-oksw/maxresdefault.jpg'
    },
  ];

  return (  
    <>
      <Navbar />
      <div className="events-container">
        <main>
          <h2>Events</h2>
          <div className="event-list">
            {eventos.map((evento) => (
              <div key={evento.id} className="event-card">
                <img src={evento.imagen} alt={evento.nombre} />
                <h3>{evento.nombre}</h3>
                <div className="event-info">
                  <p><strong>Date</strong><br/><span className="detail-description">{evento.fecha}</span></p>
                  <p><strong>Location</strong><br/><span className="detail-description">{evento.location}</span></p>
                  <p><strong>Organizer</strong><br/><span className="detail-description">{evento.organizer}</span></p>
                  <p><strong>Type of event</strong><br/><span className="detail-description">{evento.type}</span></p>
                  <p><strong>Hotel</strong><br/><span className="detail-description">{evento.hotel}</span></p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Event;