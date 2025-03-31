'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is logged in when component mounts
  useEffect(() => {
    // Check localStorage for user data
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
      setIsLoading(false);
    };
    
    // Run the check
    checkAuth();
    
    // Also set up an event listener for storage changes
    // This helps when login/logout happens in another tab
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Instead of redirecting, just update the state
    // This will cause the UI to show the login/signup links
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-*">
          <a className="navbar-brand" href="#">
            {/* Use regular img tag if Image is causing issues */}
            <img src="/avatars/logo.png" alt="Logo" width={40} height={40} />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link href="/" className="btn btn-secondary">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/events" className="btn btn-secondary">Events</Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="btn btn-secondary">Rainbow 6</Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {!isLoading && (
                user ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Welcome, {user.name || user.email}</span>
                    </li>
                    <li className="nav-item">
                      <button 
                        onClick={handleLogout}
                        className="nav-link btn btn-link"
                        style={{ cursor: 'pointer' }}
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item active">
                      <Link href="/signup" className="nav-link">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/login" className="nav-link">Sign In</Link>
                    </li>
                  </>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 className="text-danger" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Welcome to Event Creator</h1>
        <p style={{ fontSize: '20px', marginBottom: '32px' }}>Create and manage your events in one place</p>
        
        <Link href="/events/new">
          <button className="btn btn-info" style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '24px' }}>
            Create New Event
          </button>
        </Link>
        <Link href="/events">
          <button className="btn btn-info" style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '24px', marginLeft: '10px' }}>
            View Events
          </button>
        </Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '48px' }}>
        <div style={{ border: '1px solid #ddd', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Manage Events</h2>
          <p style={{ marginBottom: '16px' }}>View, edit, and delete your existing events.</p>
          <Link href="/events">
            <button className="btn btn-secondary">
              View Events
            </button>
          </Link>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>EVENTS APPPPPP</h2>
        </div>
      </div>
    </div>
  );
}