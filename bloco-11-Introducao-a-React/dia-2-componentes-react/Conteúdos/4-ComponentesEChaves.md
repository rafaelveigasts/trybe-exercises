## Lista de componentes e chaves

Agora que você já sabe o que é componente e como compô-lo, suponha que você precise implementar um componente que renderiza uma lista de compras. Entretanto, você não sabe de antemão os elementos dessa lista. Como você renderizaria dinamicamente essa lista de compras?
Imagine que temos a seguinte lista a ser renderizada de maneira dinâmica:

const shoppingList = ['leite', 'arroz', 'feijão', 'banana', 'carne'];

O primeiro passo é criar uma coleção de elementos. Para isso, iteramos sobre shoppingList com uma HOF que retorne, em um novo array , cada item da lista envolvido por um elemento <li> . A seguir, atribuímos o array resultante para a variável items .

// o console log foi adicionado para facilitar a compreensão
const items = shoppingList.map((item) => {
  console.log("item: ", item);
  return (<li>{ item }</li>);
});

Agora, só nos resta renderizar a lista que acabamos de criar! Para isso, dentro do escopo do return , devemos fazer o uso das chaves { } e utilizar, dentro dela, a constante de elementos criada anteriormente. É por meio das chaves que o React irá diferenciar o que é código a ser executado e o que deve ser apenas impresso para leitura:


import React from 'react';

class App extends React.Component {
  render() {
    const shoppingList = ['leite', 'arroz', 'feijão', 'banana', 'carne'];
    const items = shoppingList.map((item) => {
      return (<li>{ item }</li>);
    });

    return (
      <div>
        <h2>Lista de compras</h2>
        <ul>
          { items }
        </ul>
      </div>
    );
  }
}

export default App;

Pronto! Agora já podemos a renderizar múltiplos componentes de forma dinâmica, sem quaisquer problemas, certo? Quase! Ao executar o código acima, receberemos, pelo console , um alerta de que uma key deve ser definida para cada item renderizado. Essas keys são importantes para o React indentificar, com precisão, quais itens foram adicionados, removidos ou alterados.
Então, como atribuímos e quais devem ser os valores dessas keys ? O melhor valor para uma key é um que seja único para cada item da lista, como, por exemplo, um ID . No entanto, nem sempre dispomos de um ID estável em mãos, tal qual o caso do nosso código acima. Para solucionarmos esse problema, utilizamos o índice gerado no segundo parâmetro da nossa HOF . E, para atribuirmos a key , adicionamos na <li> um atributo key com o valor escolhido:

const items = shoppingList.map((item, index) => (<li key={ index }>{ item }</li>));

Vale ressaltar que, não é recomendado o uso de índices como keys em listas que possibilitam a alteração na ordem dos itens , pois pode impactar negativamente o desempenho da aplicação ou gerar problemas relacionados ao estado do componente. Caso esteja curioso e deseje entender mais a fundo esse debate e como o uso do índice pode afetar a aplicação, leia "Index as a key is ananti-pattern", por Robin Pakorny , na sessão de Recursos Adicionais .

## Agora vamos fazer este exercício de fixação:

Lembra do código de exemplo da seção anterior, referente à composição de componentes? Crie os componentes Image , UserProfile e App no diretório src do projeto fixation-exercises-10-2 , e vamos olhar especificamente para o arquivo App.js :

