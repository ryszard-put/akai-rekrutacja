const pokemonsContainer = document.querySelector('.pokemons');
const typesNodeList = document.querySelectorAll('input[type=checkbox]');
const pokemonName = document.querySelector('#pokemon-name');

function renderPokemons(pokemons) {
  // uzupełnij tutaj
  const pokemonsList = document.createElement('div');
  pokemonsList.classList.add('pokemons-list');
  pokemons.forEach(pokemon => {
    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');
    pokemonInfo.innerHTML = `
      <div class="image-container"><img class="pokemon-img" src="${
        pokemon.image
      }" alt="${pokemon.name}" /></div>
      <div class="pokemon-name">${pokemon.name}</div>
      <div class="types">${pokemon.types
        .map(type => `<div class="pokemon-type type-${type}">${type}</div>`)
        .join('')}
      </div>
    `;
    pokemonsList.appendChild(pokemonInfo);
  });

  pokemonsContainer.innerHTML = `<h1>Results: ${pokemons.length}</h1>`;
  pokemonsContainer.appendChild(pokemonsList);
}

function filterPokemons(pokemons) {
  // uzupełnij tutaj
  // zwróć odfiltrowaną tablicę pokemonów
  const types = [...typesNodeList]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id);

  const results = pokemons.filter(pokemon => {
    let isPokemonsType = false;
    types.forEach(type => {
      if (pokemon.types.includes(type)) isPokemonsType = true;
    });
    let isFilteredName = true;
    if (pokemonName.value) {
      if (
        pokemon.name.toLowerCase().search(pokemonName.value.toLowerCase()) ===
        -1
      ) {
        isFilteredName = false;
      }
    }
    if (isPokemonsType && isFilteredName) return pokemon;
  });
  return results;
}

const form = document.querySelector('form');

function submitForm(event) {
  event.preventDefault();
  // następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
  renderPokemons(filterPokemons(pokemons));
}

form.addEventListener('submit', submitForm);
