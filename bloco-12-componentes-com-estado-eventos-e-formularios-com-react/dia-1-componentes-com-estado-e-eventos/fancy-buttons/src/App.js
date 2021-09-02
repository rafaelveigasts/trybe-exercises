import React from 'react';


class App extends React.Component{

  constructor(){
    super()
    console.log('é só uma brincadeira')
    this.handleClickA = this.handleClickA.bind(this)
    this.handleClickB = this.handleClickB.bind(this)
    this.handleClickC = this.handleClickC.bind(this)
  }

  handleClickA(){
    console.log(this)
    console.log('pega na minha')
  }
  
   handleClickB(){
    console.log(this)
    console.log('balança mas não para')
  }
  
  handleClickC(){
    console.log(this)
    console.log('kkkkkkkkkkkkk')
  }

  render(){
    console.log(this)
  return (
    <div>
      <button onClick={this.handleClickA}>Btn A</button>
      <button onClick={this.handleClickB}>Btn B</button>
      <button onClick={this.handleClickC}>Btn C</button>
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

*/