'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this isnt connected to backend so using fake data wiz
    const sampleEvents = [
      {
        id: 1,
        title: 'Team Meeting',
        description: 'Weekly team ',
        location: 'A',
        startDate: new Date(2025, 3, 25, 10, 0),
        endDate: new Date(2025, 3, 25, 11, 0),
      },
      {
        id: 2,
        title: 'Product Launch',
        description: 'New product announcement',
        location: 'Main ',
        startDate: new Date(2025, 3, 30, 14, 0),
        endDate: new Date(2025, 3, 30, 16, 0),
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 500);
    
    // Lthis will be something like below at some point
    // fetch('/api/events').then(res => res.json()).then(data => {
    //   setEvents(data);
    //   setLoading(false);
    // });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Events</h1>
        <Link href="/events/new">
          <button>
            Create New Event
          </button>
        </Link>
      </div>

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
              <p style={{ color: '#666' }}>{event.description}</p>
              <p style={{ marginTop: '8px' }}>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Start:</strong> {event.startDate.toLocaleString()}
              </p>
              {event.endDate && (
                <p>
                  <strong>End:</strong> {event.endDate.toLocaleString()}
                </p>
              )}
              <div style={{ marginTop: '12px' }}>
                <Link href={`/events/${event.id}`} style={{ marginRight: '12px', color: '#4169e1' }}>
                  View
                </Link>
                <Link href={`/events/${event.id}/edit`} style={{ marginRight: '12px', color: '#28a745' }}>
                  Edit
                </Link>
                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this event?')) {
                      // Delete functionality will be added later
                      alert('Delete functionality will be implemented with the API');
                    }
                  }}
                  style={{ backgroundColor: 'transparent', color: '#dc3545', padding: '0', margin: '0' }}
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