'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
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
    <header style={{ backgroundColor: '#4169e1', color: 'white', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: 'white' }}>
          Event Creator
        </Link>
        
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
            <li>
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" style={{ color: 'white', textDecoration: 'none' }}>
                Events
              </Link>
            </li>
            <li>
              <Link href="/events/new" style={{ color: 'white', textDecoration: 'none' }}>
                Create Event
              </Link>
            </li>
          </ul>
        </nav>
        
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'white' }}>
                Welcome, {user.name || user.email}
              </span>
              <button 
                onClick={handleLogout}
                style={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link 
                href="/login" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  border: '1px solid white',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                style={{ 
                  color: '#4169e1', 
                  backgroundColor: 'white',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;