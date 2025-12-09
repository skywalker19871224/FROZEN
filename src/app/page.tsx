export default function Home() {
  // Generate slightly different colors for dummy photos
  const photos = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    color: `hsl(${200 + (i * 5) % 40}, ${60 + (i * 3) % 20}%, ${30 + (i * 2) % 40}%)`
  }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ios-bg)' }}>
      {/* 
        ヘッダーコンポーネント (ナビゲーションバー) 
        - 画面上部に固定 (position: fixed)
        - 背景色を暗いグレー + backdrop-filter: blur(10px)
        - 左上に見出し「ライブラリ」 (大きな太字)
        - 右上にアクセントカラー（#007AFF）のアイコン (+)
      */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(30, 30, 30, 0.85)', // iOS-like dark slightly transparent gray
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,
        paddingTop: 'max(16px, env(safe-area-inset-top))', // Status bar spacing
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
          fontWeight: '800', // Bold weight
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

      {/* 
        写真グリッドコンポーネント
        - ヘッダーの下に配置 (padding-topで調整)
        - CSS Grid (4列)
        - 写真間の余白は極力小さく (2px)
      */}
      <main style={{
        paddingTop: 'calc(60px + max(16px, env(safe-area-inset-top)))', // Header height + safe area
        paddingBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns as requested
        gap: '2px', // Minimal gap
      }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{
            width: '100%',
            aspectRatio: '1 / 1', // Perfect square
            backgroundColor: photo.color,
            position: 'relative'
          }}>
            {/* Dummy content placeholder */}
          </div>
        ))}
      </main>
    </div>
  );
}
