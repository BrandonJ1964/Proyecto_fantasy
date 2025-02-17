// Función para cargar JSON desde un archivo externo
async function cargarJSON() {
    try {
        const response = await fetch("../assets_Dani/js/peliculas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
}

// Función para generar el carrusel dinámico de una categoría
async function cargarPeliculas(categoria, carouselId) {
    const carouselContent = document.getElementById(carouselId);

    if (!carouselContent) {
        console.error(`No se encontró el contenedor del carrusel: ${carouselId}`);
        return;
    }

    const dbdData = await cargarJSON();
    let peliculas = dbdData.peliculas[categoria];

    if (!peliculas) {
        console.error(`Categoría ${categoria} no encontrada en el JSON`);
        return;
    }

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

// Cargar diferentes categorías en sus respectivos carruseles
document.addEventListener("DOMContentLoaded", async () => {
    await cargarPeliculas("mas_vistas", "masVistas-carousel-content");
    await cargarPeliculas("novedades", "novedades-carousel-content");
    await cargarPeliculas("hollywood", "hollywood-carousel-content");
    await cargarPeliculas("accion", "accion-carousel-content");
    await cargarPeliculas("familia", "familia-carousel-content");
    await cargarPeliculas("clasicas", "clasicas-carousel-content");
    await cargarPeliculas("comedia", "comedia-carousel-content");
    await cargarPeliculas("hechos_reales", "hechosReales-carousel-content");
});