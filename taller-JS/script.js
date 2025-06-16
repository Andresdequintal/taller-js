const searchInput=document.getElementById("search");
const container=document.getElementById("characters-container");
const speciesFilter=document.getElementById("species-filter");
const speciesFilterOptions=document.getElementById("species-filter-options");

async function fetchCharacters(searchInput){
    try {
        container.innerHTML = `<p>Cargando...</p>`;
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchInput}`);
        const data = await res.json();
        console.log(data);
        renderCharacters(data.results || []);
        } catch (error) {
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
    }

}

function renderCharacters(data) {
    console.log("renderCharacters", data);
    if (!data || !data.length ==0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }
  
    data.data.forEach(data => {
        const personajeCard = document.createElement('div');
        personajeCard.className = 'character-card';
        
        const personajeDiv = document.createElement('div');
        personajeDiv.className = 'personaje';
        personajeDiv.style.display = 'none';
        personajeDiv.textContent = personaje.strInstructions;
        
        const personajeBtn = document.createElement('button');
        personajeBtn.textContent = 'Ver personaje';
        personajeBtn.addEventListener('click', () => {
            if (personajeDiv.style.display === 'none') {
                personajeDiv.style.display = 'block';
            } else {
                personajeDiv.style.display = 'none';
            }
        });

        personajeCard.innerHTML = `
            <div class="character-container">
                <img src="${personaje.strpersonajeThumb}" alt="${personaje.strPersonaje}">
                <h3> Name: ${personaje.strPersonaje}</h3>
                <p><strong>Species:</strong> ${personaje.strCategory}</p>
                <p><strong>Status:</strong> ${personaje.strArea}</p>
            </div>
        `;
        
        
 
    });
}
fetchCharacters("");


searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  console.log(value);
  if (value.length >= 2) {
    fetchCharacters(value);
  } else {
    container.innerHTML = "<p>Escribe al menos 2 letras para buscar.</p>";
  }
});




//       const detailsDiv = personajeCard.querySelector('.meal-details');
//       detailsDiv.appendChild(recipeBtn);
//       detailsDiv.appendChild(recipeDiv);
//        container.appendChild(mealCard);
fetchCharacters("");
