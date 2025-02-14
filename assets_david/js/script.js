// Función para cargar JSON desde un archivo externo
async function cargarJSON() {
    try {
        const response = await fetch("/assets_david/js/series.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
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

    let totalSeries = series.length;
    let seriesPorSlide = 4;
    let totalSlides = Math.ceil(totalSeries / seriesPorSlide);

    for (let i = 0; i < totalSlides; i++) {
        const isActive = i === 0 ? "active" : ""; // Solo el primer slide es activo
        let slideHTML = `<div class="carousel-item ${isActive}"><div class="row justify-content-center">`;

        for (let j = i * seriesPorSlide; j < (i * seriesPorSlide) + seriesPorSlide && j < totalSeries; j++) {
            let serie = series[j];
            slideHTML += `
                <div class="col-md-3">
                    <div class="card">
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

// Cargar diferentes categorías en sus respectivos carruseles
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
