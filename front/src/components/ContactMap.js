import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ContactMap() {
    const position = [34.020882, -6.841650];  // Coordonnées de la localisation

    // Créer une icône personnalisée pour la localisation
    const locationIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',  // URL de l'icône
        iconSize: [32, 32],  // Taille de l'icône
        iconAnchor: [16, 32],  // Point d'ancrage de l'icône sur le marqueur
        popupAnchor: [0, -32],  // Point d'ancrage du popup
    });

    return (
        <div className="rounded-3 overflow-hidden shadow" style={{ width: '350px', height: '280px' }}>
            <MapContainer center={position} zoom={13} style={{ height: '300px', width: '350px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={locationIcon}>
                    <Popup>
                        Nous sommes ici ! <br /> 1 Hay SALAM, SALE, MAROC.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default ContactMap;
