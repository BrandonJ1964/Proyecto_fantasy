// JSON con las películas y sus imágenes
const dbdData = {
    "Películas_Destacadas": {
        "peliculas": [
            { "titulo": "Cars", "imagen": "../../images/brandon/peliculas/family_friendly/cars.jpg" },
            { "titulo": "Your Name", "imagen": "../../images/brandon/peliculas/anime/your_name.jpg" },
            { "titulo": "Rápidos y Furiosos", "imagen": "../../images/brandon/peliculas/accion/rapidos.jpg" },
            { "titulo": "Kneecap", "imagen": "../../images/brandon/peliculas/drama/kneecap.jpg" },
            { "titulo": "It", "imagen": "../../images/brandon/peliculas/terror/it.jpg" },
            { "titulo": "Interstellar", "imagen": "../../images/brandon/peliculas/ficcion/interstellar.jpg" },
            { "titulo": "Joker", "imagen": "../../images/brandon/peliculas/drama/joker.jpg" },
            { "titulo": "Avengers: Endgame", "imagen": "../../images/brandon/peliculas/accion/endgame.jpg" }
        ]
    }
};

// Función para cargar películas en el carrusel con 4 películas por diapositiva
function cargarPeliculas() {
    const carouselContent = document.getElementById("carousel-content");

    if (!carouselContent) {
        console.error("No se encontró el contenedor del carrusel.");
        return;
    }

    let peliculas = dbdData.Películas_Destacadas.peliculas;
    let totalPeliculas = peliculas.length;
    let peliculasPorSlide = 4;
    let totalSlides = Math.ceil(totalPeliculas / peliculasPorSlide);

    for (let i = 0; i < totalSlides; i++) {
        const isActive = i === 0 ? "active" : ""; // Solo el primer slide es activo
        let slideHTML = `<div class="carousel-item ${isActive}"><div class="row justify-content-center">`;

        for (let j = i * peliculasPorSlide; j < (i * peliculasPorSlide) + peliculasPorSlide && j < totalPeliculas; j++) {
            let pelicula = peliculas[j];
            slideHTML += `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                        </div>
                    </div>
                </div>
            `;
        }

        slideHTML += `</div></div>`;
        carouselContent.innerHTML += slideHTML;
    }
}

// Cargar películas cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", cargarPeliculas);
