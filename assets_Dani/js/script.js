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
  
  // Función para determinar cuántas películas mostrar por slide según el ancho de la ventana
  function getPeliculasPorSlide() {
    const width = window.innerWidth;
    return width >= 992 ? 4 : 2;
  }
  
  // Función para abrir el overlay de detalles de la película
  function abrirDetalles(pelicula) {
    // Actualizamos cada campo del overlay con la información de la película
    document.getElementById("detailTitle").textContent = pelicula.titulo;
    document.getElementById("detailDesc").textContent = pelicula.descripcion || "Sin descripción disponible.";
    document.getElementById("detailImage").src = pelicula.imagen;
    document.getElementById("detailYear").textContent = "Año: " + (pelicula.anio || "N/A");
    document.getElementById("detailGenre").textContent = "Género: " + (pelicula.genero || "N/A");
    document.getElementById("detailTime").textContent = "Duración: " + (pelicula.duracion || "N/A");
  
    // Asignamos la acción del botón para ver el tráiler
    const btnTrailer = document.getElementById("btnVerTrailer");
    btnTrailer.onclick = () => {
      abrirTrailer(pelicula.trailer);
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
  
    const peliculasPorSlide = getPeliculasPorSlide();
    const totalPeliculas = peliculas.length;
    const totalSlides = Math.ceil(totalPeliculas / peliculasPorSlide);
  
    // Generar cada slide
    for (let i = 0; i < totalSlides; i++) {
      const isActive = i === 0 ? "active" : "";
      let slideHTML = `<div class="carousel-item ${isActive}"><div class="d-flex flex-nowrap">`;
  
      for (let j = i * peliculasPorSlide; j < (i * peliculasPorSlide) + peliculasPorSlide && j < totalPeliculas; j++) {
        let pelicula = peliculas[j];
        slideHTML += `
          <div class="movie-item p-2">
            <div class="card" onclick='abrirDetalles(${JSON.stringify(pelicula)})'>
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
  
  // Cargar las películas en sus respectivos carruseles al cargar la página
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