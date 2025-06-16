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
        displayPersonaje(data.results || []);
        } catch (error) {
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
    }

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


fetchCharacters("");
