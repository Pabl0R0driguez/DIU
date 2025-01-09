import React from 'react';

function Jugadores() {
    const jugadoresDeCulto = [
        {
            id: 1,
            name: "Don Francisco Molinero",
            imagen: "https://www.eldesmarque.com/futbol/real-betis/20140807/molinero-lo-importante-es-llegar-bien-al-24-de-agosto_160064365.html"
        },
        {
            id: 2,
            name: "Don Sandro Ramírez Castillo",
            imagen: "https://www.elmundo.es/deportes/futbol/2017/06/20/59481f0de5fdea67468b45a7.html"
        },
        {
            id: 3,
            name: "El mago del balón Beñat Etxebarria",
            imagen: "https://www.abc.es/deportes/alfinaldelapalmera/noticias-betis/nopublicar-nueva-vida-benat-gusta-ver-betis-20241102220246-nts.html?ref=https%3A%2F%2Fwww.abc.es%2Fdeportes%2Falfinaldelapalmera%2Fnoticias-betis%2Fnopublicar-nueva-vida-benat-gusta-ver-betis-20241102220246-nts.html"
        }
    ];

    const HTMLJugadores = jugadoresDeCulto.map((jugador) => { // Cambié "jugadores" a "jugador"
        return (
            <li key={jugador.id}> 
                <h3>{jugador.name}</h3> 
                <img src={jugador.imagen} alt={jugador.name} width={200} /> 
            </li>
        );
    });

    return (
        <section>
            <h2>Jugadores:</h2>
            <ul>
                {HTMLJugadores}
            </ul>
        </section>
    );
}

export default Jugadores;
