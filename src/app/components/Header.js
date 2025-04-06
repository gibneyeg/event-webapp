'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authWidth, setAuthWidth] = useState('200px');
  
  // Adjust auth width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAuthWidth('100%');
      } else {
        setAuthWidth('200px');
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // On mount, check if user is stored in localStorage
  useEffect(() => {
    // Define checkAuth inside useEffect so it's in scope for cleanup
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          localStorage.removeItem('user');
        }
      } else {
        // Ensure user is null if no valid user in localStorage
        setUser(null);
      }
      setIsLoading(false);
    };
    
    // Using a slight delay before checking auth to ensure layout is stable
    const timeoutId = setTimeout(() => {
      checkAuth();
      window.addEventListener('storage', checkAuth);
    }, 100); // Short delay to ensure stable layout
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', checkAuth); // Now checkAuth is in scope here
    };
  }, []);
  
  // Handle logout with a more reliable approach
  const handleLogout = async () => {
    try {
      // First remove from localStorage
      localStorage.removeItem('user');
      
      // Then update the state
      setUser(null);
      
      // Small delay to ensure state updates are processed
      setTimeout(() => {
        // Navigate to login page
        router.push('/login');
      }, 50);
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback direct navigation if something fails
      window.location.href = '/login';
    }
  };

  return (
    <nav className="main-header">
      {/* Left side - Logo */}
      <div className="header-left">
        <div className="logo-container">
          <Link href="/">
            <div className="logo">EC</div>
          </Link>
        </div>
      </div>
      
      {/* Center - Navigation Links */}
      <div className="header-center">
        <ul className="nav-links">
          <li className="nav-item">
            <button onClick={() => router.push('/')} className="nav-button">Home</button>
          </li>
          <li className="nav-item">
            <button onClick={() => router.push('/events')} className="nav-button">Events</button>
          </li>
        </ul>
      </div>
      
      {/* Right side - Auth */}
      <div className="header-right">
        {isLoading ? (
          // Empty placeholder with same width to maintain layout during loading
          <div className="auth-placeholder"></div>
        ) : (
          user ? (
            <div className="user-info">
              <span className="welcome-text">Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout} className="sign-out">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <button onClick={() => router.push('/signup')} className="sign-up">Sign Up</button>
              <button onClick={() => router.push('/login')} className="sign-in">Sign In</button>
            </div>
          )
        )}
      </div>
      
      <style jsx>{`
        .main-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #000000; /* Changed to black background */
          padding: 10px 20px;
          width: 100%;
        }
        
        .header-left {
          flex: 0 0 25%;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo {
          width: 40px;
          height: 40px;
          background-color: white;
          color: #4169e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .header-center {
          flex: 0 0 50%;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 15px;
        }
        
        .nav-button {
          display: inline-block;
          padding: 8px 16px;
          color: white;
          background-color: #333;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 14px;
        }
        
        .nav-button:hover {
          background-color: #555;
        }
        
        .header-right {
          flex: 0 0 25%;
          display: flex;
          justify-content: flex-end;
          min-width: 200px;
        }
        
        .auth-placeholder {
          width: ${authWidth};
          height: 38px;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .welcome-text {
          color: white;
        }
        
        .sign-out {
          background-color: transparent;
          border: 1px solid white;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .auth-links {
          display: flex;
          gap: 10px;
        }
        
        .sign-in {
          color: white;
          background-color: transparent;
          border: 1px solid white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .sign-up {
          color: #000;
          background-color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .main-header {
            flex-direction: column;
            gap: 15px;
            padding: 15px;
          }
          
          .header-left, .header-center, .header-right {
            flex: 0 0 100%;
            width: 100%;
            justify-content: center;
          }
          
          .header-right {
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;