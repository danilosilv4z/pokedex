const typeColors = {
    fire: '#ff9d55',
    water: '#5090d6',
    grass: '#63bc5a',
    electric: '#f4d23c',
    psychic: '#fa7179',
    ice: '#73cebf',
    dragon: '#0b6dc3',
    dark: '#5a5366',
    fairy: '#ec8fe6',
    normal: '#919aa2',
    fighting: '#ce4069',
    flying: '#89aae3',
    poison: '#b763cf',
    ground: '#d97746',
    rock: '#c5b679',
    bug: '#91c12f',
    ghost: '#5269ac',
    steel: '#5a8ea1'
};

// Adiciona evento para tecla Enter
document.getElementById('entrada').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscar();
    }
});

async function buscar() {
    const entrada = document.getElementById("entrada").value.toLowerCase().trim();
    const tela = document.getElementById("tela");

    if (!entrada) return;

    // Feedback de carregamento
    tela.innerHTML = "<p class='placeholder-text'>Buscando...</p>";
    tela.style.backgroundColor = "#98d8d8"; // Reseta cor da tela

    const url = `https://pokeapi.co/api/v2/pokemon/${entrada}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            tela.innerHTML = "<p class='placeholder-text'>Pokémon não encontrado!</p>";
            return;
        }

        const data = await response.json();
        
        // Extrai tipos e gera badges
        const tipos = data.types.map(t => t.type.name);
        const tipoBadges = tipos.map(t => `<span class="tipo-badge ${t}">${t}</span>`).join('');

        // Define cor de fundo da tela baseada no primeiro tipo (com transparência)
        const corPrincipal = typeColors[tipos[0]] || '#98d8d8';
        tela.style.backgroundColor = corPrincipal + '44'; // Adiciona transparência (44 em hex)

        // Imagem de alta qualidade (Official Artwork)
        const imagem = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

        tela.innerHTML = `
            <h2 class="nome-pokemon">${data.name}</h2>
            <img class="pokemon-img" src="${imagem}" alt="${data.name}">
            <div class="tipos-container">${tipoBadges}</div>
            <p class="info-pokemon"><b>ID:</b> #${data.id}</p>
            <p class="info-pokemon"><b>Altura:</b> ${data.height / 10} m</p>
            <p class="info-pokemon"><b>Peso:</b> ${data.weight / 10} kg</p>
        `;

    } catch (error) {
        console.error(error);
        tela.innerHTML = "<p class='placeholder-text'>Erro na conexão!</p>";
    }
}
