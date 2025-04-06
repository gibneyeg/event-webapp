'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check for user authentication
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          localStorage.removeItem('user');
        }
      }
      
      setAuthChecked(true);
    };
    
    checkAuth();
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

  // Function to fetch events from API
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

  // Show loading state while checking authentication
  if (!authChecked) {
    return (
      <>
        <Header />
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  // If not logged in, show login prompt with navigation options
  if (!user) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body text-center p-4">
                  <h2 className="card-title mb-3">Sign In Required</h2>
                  <p className="card-text mb-4">
                    You need to be signed in to view and manage your events.
                  </p>
                  <div className="d-grid gap-2">
                    <Link href="/login">
                      <button className="btn btn-primary btn-lg">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="btn btn-outline-secondary">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 text-info">My Events</h1>
          <Link href="/events/new">
            <button className="btn btn-primary">Create New Event</button>
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-4">
            <p className="fs-5">No events found</p>
            <p>Create your first event to get started</p>
          </div>
        ) : (
          <div className="row g-3">
            {events.map(event => (
              <div key={event.id} className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text text-muted">{event.description || 'No description provided'}</p>
                    <p><strong>Location:</strong> {event.location || 'No location specified'}</p>
                    <p><strong>Start:</strong> {formatDate(event.startDate)}</p>
                    {event.endDate && (
                      <p><strong>End:</strong> {formatDate(event.endDate)}</p>
                    )}
                    <div className="mt-3 d-flex gap-2">
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="btn btn-link text-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}