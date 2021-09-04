import React from 'react';


class App extends React.Component{

  constructor(){
    super()
    this.handleClickA = this.handleClickA.bind(this)
    this.state = {
      numeroDeCliques : 0
    }
  }

  handleClickA(){
    this.setState((estadoAnterior, _props)=> ({
      numeroDeCliques: estadoAnterior.numeroDeCliques+1
    }))
  }
  
   // Para essa função, não precisamos utilizar o bind porque ela é utilizada
    // apenas dentro do contexto do componente App
    getButtonColor(num) {
      // Essa função contém um ternário que realiza a lógica para mudarmos
      // a cor do botão para verde quando for um número par
      return num % 2 === 0 ? 'green' : 'white';
    }

  render(){
    const { numeroDeCliques } = this.state;
  return (
    <div>
      <button 
      onClick={this.handleClickA}
      style={{ backgroundColor: this.getButtonColor(numeroDeCliques) }}
      >{this.state.numeroDeCliques}</button>
    </div>
    );
  }
}

export default App;

/*
Quando colocamos uma funcao dentro de uma classe temos que tirar o function
se deixarmos onclick={nomedafuncao} o js procura fora da classe
para acessarmos a função dentro da classe usamos this.nomedafuncao

A função constructor é uma função interna
nós podemos sobreescrever essa função com uma função nossa

super() serve para que o react  execute a lógica que estamos definindo
sobreescrevendo a função interna e abaixo do super colocamos a logica que agente quiser

o this tem um problema
dentro do render o this funciona
dentro da função ñao
para arrumar isso fazemos o processo da linhas 9-11
fazemos isso para a função enxergar o this
'esta função está ligada ao this'
<<<ATENÇÃO>>>
se quiser usar o this.props tem que fazer isso
para acessar o estado a função tem que acessar o this também

uma atualização de estado acontece de forma assíncrona
quem decide isso é o react

Para renderizarmos as cores, precisamos acrescentar a função
que contém a nossa lógica ao "inline style", passando o estado
correspondente como parâmetro
*/