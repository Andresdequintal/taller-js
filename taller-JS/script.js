const searchInput=document.getElementById("search");
const container=document.getElementById("characters-container");
const speciesFilter=document.getElementById("species-filter");
const speciesFilterOptions=document.getElementById("species-filter-options");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".close");

async function fetchCharacters(searchInput, speciesFilter) {
    try {
        container.innerHTML = `<p>Cargando...</p>`;
        
        // Obtener valores de los elementos del DOM
        const searchValue = searchInput.value.trim();
        const selectedSpecies = speciesFilter.value;
        
        // Construir la URL con los parámetros necesarios
        let url = 'https://rickandmortyapi.com/api/character/?';
        const params = [];
        
        if (searchValue.length >= 2) params.push(`name=${searchValue}`);
        if (selectedSpecies) params.push(`species=${selectedSpecies}`);
        
        url += params.join('&');
        
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        renderCharacters(data.results || []);
    } catch (error) {
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
    }
}

function renderCharacters(data) {
    console.log("renderCharacters", data);
    if (!data || data.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }
   
    container.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos elementos
    
    data.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        
        characterCard.innerHTML = `
            <div class="character-container">
                <img src="${character.image}" alt="${character.name}">
                <h3>Name: ${character.name}</h3>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Status:</strong> ${character.status}</p>
            </div>
        `;
        
        // Añadir evento click para abrir el modal
        characterCard.addEventListener('click', () => {
            showModal(character);
        });
        
        container.appendChild(characterCard);
    });
}

function showModal(character) {
    modalBody.innerHTML = `
        <div class="modal-character">
            <img src="${character.image}" alt="${character.name}" class="modal-image">
            <h2>${character.name}</h2>
            <p><strong>Género:</strong> ${character.gender}</p>
            <p><strong>Origen:</strong> ${character.origin.name}</p>
            <p><strong>Ubicación:</strong> ${character.location.name}</p>
        </div>
    `;
    modal.classList.remove('hidden');
}

// Event listener para cerrar el modal
closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Event listener para cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Event listener para el filtro de especies
speciesFilter.addEventListener('change', () => {
    fetchCharacters(searchInput, speciesFilter);
});

// Event listener para la búsqueda por nombre
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value.length >= 2) {
        fetchCharacters(searchInput, speciesFilter);
    } else {
        container.innerHTML = "<p>Escribe al menos 2 letras para buscar.</p>";
    }
});

// Carga inicial
fetchCharacters(searchInput, speciesFilter);
