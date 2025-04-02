'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';

export default function EventForm({ event, formAction }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    location: event?.location || '',
    startDate: event?.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
    endDate: event?.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Get the current user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!user) {
        throw new Error('You must be logged in to create an event');
      }

      // Add userId to the form from the user who is logged in
      const eventData = {
        ...formData,
        userId: user.id
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }
      
      alert('Event created successfully!');
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message || 'An error occurred while creating the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-form-page">
      <Header />
      
      <div className="event-form-container">
        <h1 className="page-title">89Event</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="startDate">
              Start Date/Time <span className="required">*</span>
            </label>
            <input
              id="startDate"
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endDate">
              End Date/Time
            </label>
            <input
              id="endDate"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-submit"
            >
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
            
            <Link href="/events">
              <button 
                type="button" 
                className="btn-cancel"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .event-form-page {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        .event-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        
        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          border: 1px solid #f5c6cb;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        
        .required {
          color: #dc3545;
        }
        
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.2s;
          background-color: white;
          color: #333;
        }
        
        .form-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
        
        .form-actions {
          margin-top: 30px;
          display: flex;
          gap: 12px;
        }
        
        .btn-submit {
          padding: 10px 20px;
          background-color: #00bcd4;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-submit:hover {
          background-color: #00a5b8;
        }
        
        .btn-submit:disabled {
          background-color: #b2ebf2;
          cursor: not-allowed;
        }
        
        .btn-cancel {
          padding: 10px 20px;
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-cancel:hover {
          background-color: #5a6268;
        }
        
        @media (max-width: 768px) {
          .event-form-container {
            padding: 20px 15px;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .btn-submit, .btn-cancel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}