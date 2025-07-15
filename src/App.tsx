import React, { useState } from 'react';

type Song = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
};

function App() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);

  const searchSongs = async () => {
    if (!query.trim()) return;

    const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
    const data = await response.json();
    setSongs(data.results);
  };

  return (
    <div className='content' style={styles.container}>
      <h1>🎶 Song Search App</h1>
      <div style={styles.searchArea}>
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={searchSongs} style={styles.button}>Search</button>
      </div>

      <div style={styles.results}>
        {songs.map((song) => (
          <div key={song.trackId} style={styles.card}>
            <img src={song.artworkUrl100} alt={song.trackName} />
            <div>
              <h3>{song.trackName}</h3>
              <p><strong>Artist:</strong> {song.artistName}</p>
              <audio controls src={song.previewUrl}></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial',
    textAlign: 'center' as React.CSSProperties['textAlign'],
  } as React.CSSProperties,
  searchArea: { marginBottom: 20 } as React.CSSProperties,
  input: { padding: 10, width: '60%', maxWidth: 300 } as React.CSSProperties,
  button: { padding: 10, marginLeft: 10 } as React.CSSProperties,
  results: { display: 'flex', flexDirection: 'column', gap: 20 } as React.CSSProperties,
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    border: '1px solid #ddd',
    padding: 10,
    borderRadius: 5
  } as React.CSSProperties
};

export default App;
