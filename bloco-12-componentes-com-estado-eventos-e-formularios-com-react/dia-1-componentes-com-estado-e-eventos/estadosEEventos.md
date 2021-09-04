Unindo componentes com estados e eventos


Agora que aprendemos sobre this e sobre como lidar com eventos dentro das classes React, vamos finalmente acessar o estado! Veja o exemplo abaixo para conhecer a sintaxe:

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    /* Para definir um estado inicial ao componente, a ser definido
    no momento em que o componente for colocado na tela, faça uma atribuição
    de um objeto à chave `state` do `this`, ou seja, ao `this.state`*/
    this.state = {
      numeroDeCliques: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    /* Você **NUNCA** deve fazer atribuições diretamente a `this.state`. Deve,
    ao invés disso, SEMPRE utilizar a função `this.setState(novoEstado)` do
    React*/
    this.setState({
      numeroDeCliques: 1
    })
  }

  render() {
    /*Para LER o estado, você pode usar `this.state.chaveDoMeuEstado`*/
    return <button onClick={this.handleClick}>{this.state.numeroDeCliques}</button>
  }
}

export default App;

E muita atenção ao que foi dito acima! Você NUNCA deve atribuir valores ao estado diretamente com this.state . O estado é atualizado de forma assíncrona pelo React, para garantir performance, e o React não garante a ordem em que as atualizações ocorrerão. Se você fizer uma atribuição direta, terá problemas! Faça-o sempre através da função this.setState(meuNovoObjetoQueRepresentaOEstado) . NÃO se esqueça disso! 😃
Mas se a a atualização do estado não ocorre em ordem, vocês perguntam, "como eu atualizo meu estado com base no estado anterior? Se tudo ocorre fora de ordem, como eu sei que uma conta de novoEstado = estadoAtual + 1 não dará problemas?"
Pois bem! Lembre-se de que, com Promises, para garantir que algum código executasse somente após o retorno da Promise, que é assíncrona, você tinha que colocá-lo dentro da função .then . Aqui a lógica é da mesma natureza:

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      numeroDeCliques: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    /* Passando uma callback à função setState, que recebe de parâmetros
    o estado anterior e as props do componente, você garante que as atualizações
    do estado acontecerão uma depois da outra! */
    this.setState((estadoAnterior, _props) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1
    }))
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.numeroDeCliques}</button>
  }
}

export default App;

💡 Se você quisesse chamar, no elemento, um evento passando um parâmetro, você deveria trocar a sintaxe <button onClick{this.minhaFuncao} ...> por <button onClick={() => this.minhaFuncao('meu parametro')} . Basicamente, substitua a função do evento por uma chamada à mesma feita via callback! Experimente!
Para fixar
5 - Agora você vai converter sua aplicação para uma que conta o número de cliques dado em cada botão! Primeiramente, defina um estado inicial para a contagem de cada botão.
🦜 Dica: Uma possibilidade é você definir três chaves, uma para cada botão!
6 - Agora, quando um botão for clicado, altere de forma assíncrona o estado deste botão de zero para um.
7 - Por fim, baseie-se no estado anterior ao atual para incrementar a contagem de cliques cada vez que um botão for clicado!
