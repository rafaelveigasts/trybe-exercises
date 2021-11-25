useEffect

Uma das ferramentas mais interessantes do React é a possibilidade de manipulação dos ciclos de vida de seus componentes. Até o momento, estas alterações eram feitas através dos lifecycle methods , conhecidos como componentDidMount , componentDidUpdate e componentWillUnmount .

O hook useEffect foi desenvolvido para ser uma função que pode ser executada em diferentes momentos do ciclo de vida dos componentes de forma semelhante aos três métodos. A documentação do ReactJS se refere à esta ferramenta da seguinte forma:

Se você tem familiaridade com métodos de ciclo de vida de React, você pode entender o hook useEffect como uma junção de componentDidMount, componentDidUpdate e componentWillUnmount (Tradução livre).

O hook Effect leva este nome por lidar com os efeitos colaterais que são produzidos na aplicação diante de um evento ou variável que precisa ser observada, seja ele a montagem do componente, a alteração de um estado ou a desmontagem de um componente.

Para que isso aconteça o hook recebe, geralmente, dois parâmetros, que são uma callback e um array:

  useEffect(() => {}, []);

A função será executada de acordo com o que especificarmos como segundo parâmetro. Vamos estudar a fundo cada caso:
Temos uma função e não temos um array:

  useEffect(() => {});

Esta configuração executará a função toda vez que o componente sofrer qualquer tipo de alteração e renderizar, **repetidas vezes**. Ela precisa ser utilizada com **cautela**, pois facilmente resulta em **loops infinitos**.

Temos uma função e um array vazio:

  useEffect(() => {}, []);

Neste caso, a função será executada similarmente ao `componentDidMount`, rodando apenas uma vez e na montagem do componente.


Temos uma função, e um array com um ou mais parâmetros:

  useEffect(() => {}, [variável1, variável2, ... variávelN]);

O comportamento deste modelo será semelhante ao `componentDidUpdate` e ele será executado sempre que houver mudança em alguma das variáveis especificadas.


Temos uma função retornando uma outra função, e o segundo parâmetro pode conter um array populado ou não.

  useEffect(() => 
  {
    return () => {}
  }, []);

Este caso é mais específico, pois ele pode agregar a utilização de um dos dois últimos exemplos, o `componentDidMount` ou `componentDidUpdate` dependendo do segundo parâmetro, e a função presente no retorno se comporta como `componentWillUnmount`. Ou seja, quando o componente desmonta a função retornada pelo `useEffect` é executada. Você deve definir essa função sempre que precisar limpar algo criado por seu efeito (como algum _timer_, por exemplo)

Primeiro, para estudarmos o useEffect , vamos assistir a este vídeo:

https://pt-br.reactjs.org/docs/hooks-effect.htmlhttps://pt-br.reactjs.org/docs/hooks-effect.html

1) importar o use effect 
import React, { useEffect } from 'react';

function App(){
  const url="https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    async function fetchPokemon(){
      const { results } = await fetch(url).then((response) => response.json());
      console.log(results);
    }
    fetchPokemon();
  })

  return (
    <div> 
      <h1> Olá mundo</h1>
    </div>
  );
}

export default App;

o useEffect()  é usado alinhado com useState() adicionamos ele na importação

import React { useEffect, useState } from 'react';

2) definimos os estados iniciais:

const [pokemons, setPokemons] = useState([estado inicial é um array vazio])

Quando tiver o resultado da api fazemos um 
  setPokemons(results)

Para fixar
Caso precise de ajuda, colocamos nos Recursos Adicionais um link que possui diversos hooks customizados mais complexos, eles podem te dar uma dica de como fazê-lo.
Para fixar, faça um componente funcional React com as seguintes funcionalidades:
A cada 10 segundos ele gera e exibe na tela um número aleatório de 1 a 100;
Se o número for múltiplo de 3 ou 5, uma mensagem "Acerto" é exibida na tela;
A mensagem de acerto é removida 4 segundos depois de ser exibida;
O timer é removido quando o componente é desmontado.