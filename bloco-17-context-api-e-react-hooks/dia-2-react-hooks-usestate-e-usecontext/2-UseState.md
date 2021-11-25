useState

O useState é o hook mais comum e ele permite que você utilize o state e outros recursos do React sem escrever uma classe. Para entender melhor do que estamos falando, veja este componente com Estado feito com uma classe e em seguida o mesmo componente feito com hooks :

Os componentes funcionais recebem como primeiro parâmetro as props, que nós podemos desestruturar e utilizar dentro do contexto

ex.: 

antes => const { todos } = this.props

function TodoList({todos}) {
  return (
    <ul>
      {todos.map(todo => <li>{todo}</li>)}
    </ul>
  );
}

export default TodoList;

Não extistem construtor() nem state={} nos componentes funcionais, somente nos componentes de classe

O useState é o hook mais comum e ele permite que você utilize o state e outros recursos do React sem escrever uma classe. Para entender melhor do que estamos falando, veja este componente com Estado feito com uma classe e em seguida o mesmo componente feito com hooks :


import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <div>Counter: {counter}</div>Visando um app do zero, como podemos mensurar a escabilidade da aplicação para definirmos a utilização de hooks ou redux se aparentemente hooks resolve tudo mais fácil?

        <button
          type="button"
          onClick={() =>
            this.setState((prevState) => ({ counter: prevState.counter + 1 }))
          }
        >
          Increase Counter
        </button>
      </div>
    );
  }
}

export default App;

Vamos agora criar esse mesmo componente usando função e utilizar hooks para entender como o useState funciona:

import React, { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>Counter: {counter}</div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increase Counter
      </button>
    </div>
  );
}

export default App;

A primeira mudança é que não é mais necessário importar o Component , somente o useState .

O constructor , junto com o super e o this.state também foram removidos. Ao invés disso foi adicionado o useState: O counter é o valor do estado, o setCounter é a função que será usada para definir novos valores ao estado e o useState(0) é onde você adiciona o valor inicial do seu estado, neste caso 0 . E repare que não precisamos nos preocupar em como atualizar um estado com base no estado anterior! Essa lógica funciona de forma transparente.

Nosso event handler onClick também mudou. No lugar de this.setState temos somente a chamada da função setCounter definida anteriormente, recebendo como parâmetro o novo valor de counter , neste caso counter + 1 .

Com o useState , no lugar de ter todos os estados do componente dentro de um grande objeto, teremos um useState diferente para cada valor de estado que estiver sendo utilizado.