const container = document.getElementById("characters");
const searchInput = document.getElementById("searchInput");

async function fetchCharacters() {
  try {
    const response = await fetch("https://dragonball-api.com/api/characters");
    const data = await response.json();
    renderCharacters(data.items);
  } catch (error) {
    container.innerHTML = "<p class='text-red-500'>Error al cargar personajes 😢</p>";
  }
}

function renderCharacters(characters) {
  container.innerHTML = "";
  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card bg-white/10 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 border border-white/10 hover:bg-white/20";

    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h2 class="text-xl font-bold text-yellow-300">${char.name}</h2>
        <p class="text-sm">Ki: <span class="text-green-400">${char.ki ?? 'Desconocido'}</span></p>
        <p class="text-sm">Raza: ${char.race ?? 'Desconocido'}</p>
        <p class="text-sm">Universo: ${char.universe ?? 'Desconocido'}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

searchInput.addEventListener("input", async (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const res = await fetch("https://dragonball-api.com/api/characters");
  const data = await res.json();
  const filtered = data.items.filter((char) =>
    char.name.toLowerCase().includes(searchTerm)
  );
  renderCharacters(filtered);
});

fetchCharacters();
