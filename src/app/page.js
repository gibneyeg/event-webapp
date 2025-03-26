import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
<div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      <Image src="/avatars/logo.png" alt="Logo" width={40} height={40} />
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className= "btn btn-secondary" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="btn btn-secondary" href="#">Events</a>
        </li>
        <li className="nav-item">
          <a className="btn btn-secondary" href="#">Rainbow 6</a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Sign Up <span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Sign In</a>
        </li>
      </ul>
    </div>
  </nav>
</div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 className="text-danger" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Welcome to Event Creator</h1>
        <p style={{ fontSize: '20px', marginBottom: '32px' }}>Create and manage your events in one place</p>
        
        <Link href="/events/new">
          <button className = "btn btn-info" style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '24px' }}>
            Create New Event
          </button>
        </Link>
        <Link href="/events/new">
          <button className = "btn btn-info" style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '24px' }}>
            view events
          </button>
        </Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '48px' }}>
        <div style={{ border: '1px solid #ddd', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Manage Events</h2>
          <p style={{ marginBottom: '16px' }}>View, edit, and delete your existing events.</p>
          <Link href="/events">
            <button style={{ backgroundColor: '#6c757d' }}>
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