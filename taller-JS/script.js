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

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.length >= 2) {
    fecthPersonaje(value);
  } else {
    container.innerHTML = "<p>Escribe al menos 2 letras para buscar.</p>";
  }
});


fecthPersonaje("");