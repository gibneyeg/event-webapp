'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from './components/Header';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in when component mounts
  useEffect(() => {
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
      setLoading(false);
    };
    
    checkAuth();
    
    // Also set up an event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <div className="home-container">
      <Header />
      
      {/* Hero Section - Now with increased height */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Event Creator</h1>
          <p className="hero-description">Create and manage your events in one place</p>
         
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2 className="feature-title">Manage Events</h2>
          <p className="feature-description">View, edit, and delete your existing events.</p>
          <Link href="/events">
            <button className="text-button">View Events →</button>
          </Link>
        </div>
        
        <div className="feature-card">
          <h2 className="feature-title">Event Planning</h2>
          <p className="feature-description">Organize your event schedule, invite guests, and track attendance.</p>
          <Link href="/events/new">
            <button className="text-button">Create Event →</button>
          </Link>
        </div>
      </section>
      
      {/* Styles */}
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f5f5f5;
        }
        
        .hero {
          padding: 120px 24px; /* Increased from 64px to 120px for more height */
          min-height: 500px; /* Added minimum height */
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/backdrop.jpg');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 24px; /* Increased from 16px */
          color: white;
        }
        
        .hero-description {
          font-size: 22px; /* Increased from 20px */
          margin-bottom: 40px; /* Increased from 32px */
          opacity: 0.9;
        }
        
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 20px; /* Added margin top */
        }
        
        .primary-button {
          background-color: #00bcd4;
          color: white;
          border: none;
          padding: 14px 28px; /* Increased from 12px 24px */
          font-size: 18px; /* Increased from 16px */
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .primary-button:hover {
          background-color: #00a5b8;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
        }
        
        .secondary-button {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid white;
          padding: 14px 28px; /* Increased from 12px 24px */
          font-size: 18px; /* Increased from 16px */
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .secondary-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .features {
          padding: 64px 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .feature-card {
          background-color: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .feature-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #333;
        }
        
        .feature-description {
          color: #666;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        .text-button {
          background: none;
          border: none;
          color: #00bcd4;
          font-weight: 600;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        
        .text-button:hover {
          color: #0097a7;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero {
            padding: 80px 24px; /* Still increased but slightly less on mobile */
            min-height: 400px; /* Smaller min-height on mobile */
          }
          
          .hero-title {
            font-size: 36px;
          }
          
          .hero-description {
            font-size: 18px;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .primary-button, .secondary-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}