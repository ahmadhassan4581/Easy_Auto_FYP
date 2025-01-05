import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Profile.css';

const LocationSelector = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ latitude: lat, longitude: lng });
      console.log(`Latitude: ${lat}, Longitude: ${lng}`); // Log the selected position to the console
    },
  });

  return null;
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showrooms, setShowrooms] = useState([]);
  const [newShowroom, setNewShowroom] = useState({ name: '', location: null });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOwner = localStorage.getItem('owner');
    if (storedOwner) {
      const parsedOwner = JSON.parse(storedOwner);
      setUser(parsedOwner);
      fetchShowrooms(parsedOwner.ownerId);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const fetchShowrooms = async (ownerId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/showrooms/owner/${ownerId}`);
      const showroomsData = response.data;
      if (showroomsData && showroomsData.length > 0) {
        const showroomDetails = showroomsData.map(showroom => ({
          showroomId: showroom._id,
          name: showroom.name,
          latitude: showroom.latitude,
          longitude: showroom.longitude,
        }));

        localStorage.setItem('showroom', JSON.stringify(showroomDetails));
        setShowrooms(showroomsData);
      }
    } catch (error) {
      console.error('Error fetching showrooms:', error);
      setMessage('Failed to load showrooms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShowroom = async (e) => {
    e.preventDefault();
    if (showrooms.length > 0) {
      setMessage('You can only create one showroom per account.');
      return;
    }
    if (!newShowroom.location) {
      setMessage('Please select a location on the map.');
      return;
    }
    try {
      setLoading(true);
      console.log("Creating showroom with data:", newShowroom); // Log the showroom data before submitting
      const response = await axios.post('http://localhost:4000/api/showrooms/create', {
        name: newShowroom.name,
        latitude: newShowroom.location.latitude,
        longitude: newShowroom.location.longitude,
        ownerId: user.ownerId,  // Make sure the ownerId matches the backend API expectations
      });

      if (response.status === 201) {
        setMessage('Showroom created successfully');
        setNewShowroom({ name: '', location: null });
        fetchShowrooms(user.ownerId);
      }
    } catch (error) {
      console.error('Error creating showroom:', error);
      setMessage('Error creating showroom');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShowroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <p><strong>Owner Name:</strong> {user.ownerName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Owner ID:</strong> {user.ownerId}</p>
      <hr />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {showrooms.length > 0 ? (
            <div className="showroom-list">
              <h3>Your Showrooms</h3>
              {showrooms.map((showroom) => (
                <div key={showroom._id} className="showroom-item">
                  <p><strong>Showroom ID:</strong> {showroom._id}</p>
                  <p><strong>Showroom Name:</strong> {showroom.name}</p>
                  <p><strong>Location:</strong> {`Latitude: ${showroom.latitude}, Longitude: ${showroom.longitude}`}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No showrooms found. Create a new one below:</p>
          )}

          {showrooms.length === 0 && (
            <div className="create-showroom">
              <h3>Create a New Showroom</h3>
              <form onSubmit={handleCreateShowroom}>
                <input
                  type="text"
                  name="name"
                  placeholder="Showroom Name"
                  value={newShowroom.name}
                  onChange={handleInputChange}
                  required
                />
                <div className="map-container">
                  <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <LocationSelector setLocation={(location) => setNewShowroom((prev) => ({ ...prev, location }))} />
                    {newShowroom.location && (
                      <Marker position={[newShowroom.location.latitude, newShowroom.location.longitude]} />
                    )}
                  </MapContainer>
                </div>
                <button type="submit">Create Showroom</button>
              </form>
            </div>
          )}
        </>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
