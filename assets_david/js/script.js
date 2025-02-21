// Función para cargar JSON desde un archivo externo
async function cargarJSON() {
    try {
        const response = await fetch("../assets_david/js/series.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
}

// Función para determinar cuántas series mostrar por slide según el ancho de la ventana
function getSeriesPorSlide() {
    const width = window.innerWidth;
    return width >= 992 ? 4 : 2;
}

// Función para abrir el overlay de detalles de la serie
function abrirDetalles(serie) {
    // Actualizamos cada campo del overlay con la información de la serie
    document.getElementById("detailTitle").textContent = serie.titulo;
    document.getElementById("detailDesc").textContent = serie.descripcion || "Sin descripción disponible.";
    document.getElementById("detailImage").src = serie.imagen;
    document.getElementById("detailYear").textContent = "Año: " + (serie.anio || "N/A");
    document.getElementById("detailGenre").textContent = "Género: " + (serie.genero || "N/A");
    document.getElementById("detailDur").textContent = "Duración: " + (serie.duracion || "N/A");

    // Asignamos la acción del botón para ver el tráiler
    const btnTrailer = document.getElementById("btnVerTrailer");
    btnTrailer.onclick = () => {
        abrirTrailer(serie.trailer);
    };

    // Mostramos el overlay
    document.getElementById("movieDetails").style.display = "flex";
}

// Función para cerrar el overlay de detalles
document.getElementById("closeDetails").addEventListener("click", () => {
    document.getElementById("movieDetails").style.display = "none";
});

// Función para abrir el modal con el tráiler (se mantiene la implementación existente)
function abrirTrailer(url) {
    const trailerIframe = document.getElementById("trailer-iframe");
    trailerIframe.src = url;
    const trailerModal = new bootstrap.Modal(document.getElementById("trailerModal"));
    trailerModal.show();
}

// Función para generar el carrusel dinámico de una categoría
async function cargarSeries(categoria, carouselId) {
    const carouselContent = document.getElementById(carouselId);
    if (!carouselContent) {
        console.error(`No se encontró el contenedor del carrusel: ${carouselId}`);
        return;
    }

    const dbdData = await cargarJSON();
    let series = dbdData.series[categoria];
    if (!series) {
        console.error(`Categoría ${categoria} no encontrada en el JSON`);
        return;
    }

    const seriesPorSlide = getSeriesPorSlide();
    const totalSeries = series.length;
    const totalSlides = Math.ceil(totalSeries / seriesPorSlide);

    // Generar cada slide
    for (let i = 0; i < totalSlides; i++) {
        const isActive = i === 0 ? "active" : "";
        let slideHTML = `<div class="carousel-item ${isActive}"><div class="d-flex flex-nowrap">`;

        for (let j = i * seriesPorSlide; j < (i * seriesPorSlide) + seriesPorSlide && j < totalSeries; j++) {
            let serie = series[j];
            slideHTML += `
                <div class="movie-item p-2">
                    <div class="card" onclick='abrirDetalles(${JSON.stringify(serie)})'>
                        <img src="${serie.imagen}" class="card-img-top" alt="${serie.titulo}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${serie.titulo}</h5>
                        </div>
                    </div>
                </div>
            `;
        }

        slideHTML += `</div></div>`;
        carouselContent.innerHTML += slideHTML;
    }
}

// Cargar las series en sus respectivos carruseles al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarSeries("mas_vistas", "masVistas-carousel-content");
    await cargarSeries("novedades", "novedades-carousel-content");
    await cargarSeries("hollywood", "hollywood-carousel-content");
    await cargarSeries("accion", "accion-carousel-content");
    await cargarSeries("familia", "familia-carousel-content");
    await cargarSeries("clasicas", "clasicas-carousel-content");
    await cargarSeries("comedia", "comedia-carousel-content");
    await cargarSeries("hechos_reales", "hechosReales-carousel-content");
});