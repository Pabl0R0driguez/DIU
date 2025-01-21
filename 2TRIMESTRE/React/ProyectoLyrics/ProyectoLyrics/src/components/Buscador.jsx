import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Buscador({ onSearch }) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      if (!response.ok) {
        throw new Error('No se encontró la letra. Verifica los datos ingresados.');
      }
      const data = await response.json();
      onSearch({ artist, song, lyrics: data.lyrics });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <h1>Buscador de Canciones</h1>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Artista"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Canción"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Buscador;
