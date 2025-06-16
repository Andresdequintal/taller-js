const searchInput=document.getElementById("search");
const container=document.getElementById("personajes-container");


async function fecthPersonaje(searchInput){
    try{
        const res = await fetch(`https://rickandmortyapi.com/api/character/${searchInput}`);
        const data = await res.json();
        console.log(data);
        displayPersonajes(data.personajes || []);
    }catch(err){
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
    }
}

function renderCharacters(data) {

    if (!data || !data.data) {
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

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.length >= 2) {
    fecthPersonaje(value);
  } else {
    container.innerHTML = "<p>Escribe al menos 2 letras para buscar.</p>";
  }
});


fecthPersonaje("");

//       const detailsDiv = personajeCard.querySelector('.meal-details');
//       detailsDiv.appendChild(recipeBtn);
//       detailsDiv.appendChild(recipeDiv);
//        container.appendChild(mealCard);