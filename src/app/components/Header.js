import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#4169e1', color: 'white', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: 'white' }}>
          Event Creator
        </Link>
        
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
            <li>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" style={{ color: 'white', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                Events
              </Link>
            </li>
            <li>
              <Link href="/events/new" style={{ color: 'white', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                Create Event
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;