// Función para cargar JSON desde un archivo externo
async function cargarJSON() {
    try {
        const response = await fetch("/assets_br/js/peliculas.json");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error cargando el JSON:", error);
        return null;
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
    if (!dbdData || !dbdData.lo_mejor_de_dbd || !dbdData.lo_mejor_de_dbd[categoria]) {
        console.error(`Categoría "${categoria}" no encontrada en el JSON`);
        return;
    }

    const peliculas = dbdData.lo_mejor_de_dbd[categoria];
    let peliculasPorSlide = 4;
    let totalSlides = Math.ceil(peliculas.length / peliculasPorSlide);
    let carouselHTML = "";

    for (let i = 0; i < totalSlides; i++) {
        const isActive = i === 0 ? "active" : ""; // Solo el primer slide es activo
        carouselHTML += `<div class="carousel-item ${isActive}"><div class="row justify-content-center">`;

        for (let j = i * peliculasPorSlide; j < (i + 1) * peliculasPorSlide && j < peliculas.length; j++) {
            const pelicula = peliculas[j];
            carouselHTML += `
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

        carouselHTML += `</div></div>`;
    }

    carouselContent.innerHTML = carouselHTML; // Inserta el contenido de una sola vez
}

// Cargar carruseles y gestionar video
document.addEventListener("DOMContentLoaded", async () => {
    const categorias = ["peliculas_destacadas", "drama", "accion", "anime", "series"];
    const carouselIds = ["peliculas-carousel-content", "drama-carousel-content", "accion-carousel-content", "anime-carousel-content", "series-carousel-content"];

    for (let i = 0; i < categorias.length; i++) {
        await cargarPeliculas(categorias[i], carouselIds[i]);
    }

    // Configurar video
    const video = document.getElementById("serieVideo");
    if (video) {
        video.addEventListener("loadedmetadata", () => {
            video.currentTime = 30; // Empieza en el minuto 1:20
        });

        video.addEventListener("timeupdate", () => {
            if (video.currentTime >= 100) { // 1:40 minutos
                video.currentTime = 90; // Vuelve a 1:20
            }
        });
    }
});