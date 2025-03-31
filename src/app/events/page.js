'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Function to format dates properly
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      console.error("Date parsing error:", error);
      return "Invalid date";
    }
  };

  // Function to fetch events from API - now includes user ID
  const fetchEvents = async () => {
    if (!user) return; 
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/events?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      console.log('Fetched events:', data);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when user is set
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const handleDeleteEvent = async (eventId) => {
    if (!user) return; 
    
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${eventId}?userId=${user.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete event');
        }
        
        // Refresh the events list after deletion
        fetchEvents();
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event: ' + err.message);
      }
    }
  };

  // If not logged in, show message
  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Please log in to view your events</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>My Events</h1>
        <Link href="/events/new">
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#0d6efd', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Create New Event
          </button>
        </Link>
      </div>
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '16px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}
      
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <p style={{ fontSize: '20px' }}>No events found</p>
          <p style={{ marginTop: '8px' }}>Create your first event to get started</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map(event => (
            <div key={event.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{event.title}</h2>
              <p style={{ color: '#666' }}>{event.description || 'No description provided'}</p>
              <p style={{ marginTop: '8px' }}>
                <strong>Location:</strong> {event.location || 'No location specified'}
              </p>
              <p>
                <strong>Start:</strong> {formatDate(event.startDate)}
              </p>
              {event.endDate && (
                <p>
                  <strong>End:</strong> {formatDate(event.endDate)}
                </p>
              )}
              <div style={{ marginTop: '12px' }}>
                <Link href={`/events/${event.id}?userId=${user.id}`} style={{ marginRight: '12px', color: '#4169e1' }}>
                  View
                </Link>
                <Link href={`/events/${event.id}/edit?userId=${user.id}`} style={{ marginRight: '12px', color: '#28a745' }}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#dc3545', 
                    padding: '0', 
                    margin: '0',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}