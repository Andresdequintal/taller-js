const searchInput = document.getElementById("search");
const container = document.getElementById("characters-container");
const speciesFilter = document.getElementById("species-filter");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".close");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

async function fetchCharacters(searchInput, speciesFilter) {
    try {
        container.innerHTML = "<p>cargando...</p>";
        const searchValue = searchInput.value.trim();
        const selectedSpecies = speciesFilter.value;
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}&species=${selectedSpecies}`);
        const data = await res.json();
        renderCharacters(data.results || []);
    } catch (error) {
        container.innerHTML = "<p>Error al cargar los datos</p>";
    }
}

function renderCharacters(data) {
    if (!data || data.length == 0) {
        container.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }
    
    container.innerHTML = "";
    
    data.forEach(character => {
        const card = document.createElement("div");
        card.className = "character-card";
        
        const esFavorito = favoritos.includes(character.id);
        const claseEstrella = esFavorito ? "star favorited" : "star";
        
        card.innerHTML = `
            <div class="character-container">
                <img src="${character.image}" alt="${character.name}">
                <h3>Name: ${character.name}</h3>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Status:</strong> ${character.status}</p>
                <div class="${claseEstrella}">★</div>
            </div>
        `;
        
        card.addEventListener("click", function(event) {
            if (event.target.className === "star") {
                event.target.classList.toggle("favorited");
                
                if (event.target.classList.contains("favorited")) {
                    favoritos.push(character.id);
                } else {
                    favoritos = favoritos.filter(id => id !== character.id);
                }
             
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                return;
            }
            
            modalBody.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>Genero:</strong> ${character.gender}</p>
                <p><strong>Origen:</strong> ${character.origin.name}</p>
                <p><strong>Ubicacion:</strong> ${character.location.name}</p>
            `;
            modal.classList.remove("hidden");
        });
        
        container.appendChild(card);
    });
}

closeButton.addEventListener("click", function() {
    modal.classList.add("hidden");
});

speciesFilter.addEventListener("change", function() {
    fetchCharacters(searchInput, speciesFilter);
});

searchInput.addEventListener("input", function() {
    const value = this.value.trim();
    if (value.length >= 2) {
        fetchCharacters(searchInput, speciesFilter);
    } else {
        container.innerHTML = "<p>Escribe al menos 2 letras para buscar</p>";
    }
});

fetchCharacters(searchInput, speciesFilter);
