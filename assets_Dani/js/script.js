//Función para cargar JSON desde un archivo externo
async function cargarJSON() {
    try {
        const response = await fetch("../assets_Dani/js/peliculas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
}

//Función para determinar cuántas películas mostrar por slide según el ancho de la ventana
function getPeliculasPorSlide() {
    const width = window.innerWidth;
    if (width >= 992) {
        return 4;
    } else {
        return 2;
    }
}

//Función para generar el carrusel dinámico de una categoría con múltiples slides
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

    //Determinar la cantidad de películas por slide según el tamaño de pantalla
    let peliculasPorSlide = getPeliculasPorSlide();
    let totalPeliculas = peliculas.length;
    let totalSlides = Math.ceil(totalPeliculas / peliculasPorSlide);

    //Generar cada slide
    for (let i = 0; i < totalSlides; i++) {
        const isActive = i === 0 ? "active" : "";
        let slideHTML = `<div class="carousel-item ${isActive}">
                        <div class="d-flex flex-nowrap">`;

        //Agregar las películas correspondientes a este slide
        for (let j = i * peliculasPorSlide; j < (i * peliculasPorSlide) + peliculasPorSlide && j < totalPeliculas; j++) {
            let pelicula = peliculas[j];
            slideHTML += `
                <div class="movie-item">
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

//Cargar las películas de las diferentes categorías en sus respectivos carruseles
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