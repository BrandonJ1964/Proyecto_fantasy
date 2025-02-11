// JSON con las películas y sus imágenes
const dbdData = {
    "lo_mejor_de_dbd": {
        "peliculas": [
            { "titulo": "Cars", "imagen": "../../images/brandon/peliculas/family_friendly/cars.jpg" },
            { "titulo": "Your Name", "imagen": "../../images/brandon/peliculas/anime/your_name.jpg" },
            { "titulo": "Rápidos y Furiosos", "imagen": "../../images/brandon/peliculas/accion/rapidos.jpg" },
            { "titulo": "Kneecap", "imagen": "../../images/brandon/peliculas/drama/kneecap.jpg" },
            { "titulo": "It", "imagen": "../images/../brandon/peliculas/terror/it.jpg" },
            { "titulo": "Interstellar", "imagen": "../../images/brandon/peliculas/ficcion/interstellar.jpg" }
        ]
    }
};

// Función para cargar películas en el carrusel
function cargarPeliculas() {
    const carouselContent = document.getElementById("carousel-content");

    dbdData.lo_mejor_de_dbd.peliculas.forEach((pelicula, index) => {
        const isActive = index === 0 ? "active" : ""; // Solo el primer elemento es activo
        const peliculaHTML = `
            <div class="carousel-item ${isActive}">
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${pelicula.titulo}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        carouselContent.innerHTML += peliculaHTML;
    });
}

// Cargar películas cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", cargarPeliculas);
