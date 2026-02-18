import { useState, useEffect } from 'react';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://rickandmortyapi.com/api/character');

                if (!response.ok) {
                    throw new Error('Error en la petición');
                }

                const data = await response.json();
                setCharacters(data.results);
            } catch (err) {
                setError(err.message);
            } finally {c
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) return <div className="loading">Cargando datos del multiverso...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container">
            <h1 className="title">Rick and Morty API</h1>
            <div className="grid">
                {characters.map((character) => (
                    <div key={character.id} className="card">
                        <img src={character.image} alt={character.name} />
                        <div className="card-info">
                            <h3>{character.name}</h3>
                            <p>IMPACTO: <span className="status">{character.status}</span></p>
                            <p>ESPECIE: {character.species}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterList;