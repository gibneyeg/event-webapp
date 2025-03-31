'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EventForm({ event, formAction }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    location: event?.location || '',
    startDate: event?.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
    endDate: event?.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Form submitted successfully!');
        router.push('/events');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };  

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="location" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Location
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="startDate" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Start Date/Time *
        </label>
        <input
          id="startDate"
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="endDate" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          End Date/Time
        </label>
        <input
          id="endDate"
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <button type="submit" style={{ marginRight: '8px' }}>
          {event ? 'Update Event' : 'Create Event'}
        </button>
        <Link href="/events">
          <button type="button" style={{ backgroundColor: '#6c757d' }}>
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}