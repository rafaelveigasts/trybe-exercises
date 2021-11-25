import React, { useEffect, useState } from "react";

function App() {
  const [limit, setLimit] = useState(10);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  const [pokemons, setPokemons] = useState([]);

  // useEffect recebe dois parametros, uma função e um array de dependencias.
  // Se o array de dependencias for vazio, a função será executada apenas uma vez quando for montado na tela, similar ao componentDidMount.

  // Se o array de dependencias for preenchido, a função será executada toda vez que o array de dependencias for alterado.

  useEffect(() => {
    async function fetchPokemon() {
      const { results } = await fetch(url).then((res) => res.json());
      setPokemons(results);
      console.log(results);
    }
    fetchPokemon();
  }, [limit, url]);

  const searchMorePokemons = () => {
    setLimit(limit + 10);
    console.log(limit);

    // Para usar o componentWillUnmount, ele precisa estar no return da callback.

    return (
      () => {
        console.log("Componente desmontado");
      },
      [limit]
    );
  };

  return (
    <div>
      <button type="button" onClick={searchMorePokemons}>
        Buscar mais Pokemóns
      </button>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={pokemon.name}>{`${index + 1} ${pokemon.name}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
