'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  // On mount, check if user is stored in localStorage
  useEffect(() => {
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
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        <img src="/avatars/logo.png" alt="Logo" width={40} height={40} />
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
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
            <Link href="/events/new" className="btn btn-secondary">Create Event</Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.name || user.email}</span>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link btn btn-link"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/signup" className="nav-link">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="nav-link">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;