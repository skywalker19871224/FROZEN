export default function Home() {
  // Generate dummy photos, some 'locked'
  const photos = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    // First 5 are 'unlocked' (clear), rest are 'locked' (blurred)
    isLocked: i >= 5,
    color: `hsl(${200 + (i * 5) % 40}, ${60 + (i * 3) % 20}%, ${30 + (i * 2) % 40}%)`
  }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ios-bg)' }}>
      {/* Header (same as before) */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: '12px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '0.5px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '32px',
          fontWeight: '800',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.5px'
        }}>
          ライブラリ
        </h1>
        <button style={{
          background: 'none',
          border: 'none',
          color: '#007AFF',
          fontSize: '28px',
          fontWeight: '300',
          cursor: 'pointer',
          padding: '0 4px',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          +
        </button>
      </header>

      {/* Photo Grid */}
      <main style={{
        paddingTop: 'calc(60px + max(16px, env(safe-area-inset-top)))',
        paddingBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px',
      }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{
            width: '100%',
            aspectRatio: '1 / 1',
            backgroundColor: photo.color,
            position: 'relative',
            overflow: 'hidden', // Ensure blur doesn't leak
            cursor: 'pointer'
          }}>
            {/* Simulation of content */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url("https://via.placeholder.com/300")', // Placeholder image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Apply blur filter if locked
              filter: photo.isLocked ? 'blur(15px) brightness(0.8)' : 'none',
              transform: 'scale(1.1)', // Scale up slightly to hide blur edges
              transition: 'filter 0.3s ease'
            }} />

            {/* Lock Overlay Icon */}
            {photo.isLocked && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

