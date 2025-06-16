const searchInput=document.getElementById("search");
const container=document.getElementById("characters-container");
const speciesFilter=document.getElementById("species-filter");


async function fetchCharacters(searchInput, speciesFilter) {
    try {
        container.innerHTML = `<p>Cargando...</p>`;
        
        const searchValue = searchInput.value.trim();
        const selectedSpecies = speciesFilter.value;
        
        const params = [];
        if (searchValue.length >= 2) params.push(`name=${searchValue}`);
        if (selectedSpecies) params.push(`species=${selectedSpecies}`);
        
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.join('&')}`);
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
   
    container.innerHTML = ''; 
    
    data.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        
        characterCard.innerHTML = `
            <div class="character-container">
                <img src="${character.image}" alt="${character.name}">
                <h3>Name: ${character.name}</h3>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Status:</strong> ${character.status}</p>
                <div class="star">★</div>
            </div>
        `;
        const star = characterCard.querySelector('.star');

        star.addEventListener('click', () => {
            console.log(star);  
            star.classList.toggle('favorited');
        });
        
        container.appendChild(characterCard);
    });
}

speciesFilter.addEventListener('change', () => {
    fetchCharacters(searchInput, speciesFilter);
});


searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value.length >= 2) {
        fetchCharacters(searchInput, speciesFilter);
    } else {
        container.innerHTML = "<p>Escribe al menos 2 letras para buscar.</p>";
    }
});


fetchCharacters(searchInput, speciesFilter);
