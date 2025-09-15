async function buscar() {
      var entrada = document.getElementById("entrada").value.toLowerCase();
      var url = "https://pokeapi.co/api/v2/pokemon/" + entrada;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          document.getElementById("tela").innerHTML = "<p>Pokémon não encontrado!</p>";
          return;
        }

        const data = await response.json();
        var tela = document.getElementById("tela");

        tela.innerHTML =
         "<h2 class='nome-pokemon'>" + data.name.toUpperCase() + "</h2>" + // nome grande
         "<img class='pokemon' src='" + data.sprites.front_default + "'>" +
         "<p class='info-pokemon'><b>ID:</b> " + data.id + "</p>" +
         "<p class='info-pokemon'><b>Tipo:</b> " + data.types.map(type => type.type.name).join(", ") + "</p>" +
         "<p class='info-pokemon'><b>Habilidades:</b> " + data.abilities.map(ability => ability.ability.name).join(", ") + "</p>";
      } catch (error) {
        document.getElementById("tela").innerHTML = "<p>Erro ao buscar Pokémon!</p>";
      }
    }


