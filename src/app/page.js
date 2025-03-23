import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Welcome to Event Creator</h1>
        <p style={{ fontSize: '20px', marginBottom: '32px' }}>Create and manage your events in one place</p>
        
        <Link href="/events/new">
          <button style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '24px' }}>
            Create New Event
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