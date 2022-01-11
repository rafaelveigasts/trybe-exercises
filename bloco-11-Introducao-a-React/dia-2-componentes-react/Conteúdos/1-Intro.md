Conteúdos
Como já sabemos, componentes são a base de toda aplicação React . Eles nos permitem segmentar uma página web em blocos de códigos independentes e reutilizáveis , além de tornarem o ambiente de desenvolvimento um local mais organizado. Conceitualmente, componentes React são funções ou classes JavaScript que podem aceitar parâmetros, chamados de props (do inglês properties ), e retornam elementos React responsáveis por determinarem o que será renderizado na tela.
Existem duas maneiras de definirmos um componente:
Via função JavaScript:

  function Greeting(props) {
    return (<h1>Hello, {props.name}</h1>);
  }

  export default Greeting;
Via classe :

  import React from 'react';

  class Greeting extends React.Component {
    render() {
      return (<h1>Hello, {this.props.name}</h1>);
    }
  }

  export default Greeting;
  
Apesar de ambos os métodos serem equivalentes , tanto a função quanto a classe possuem recursos adicionais, os quais nos aprofundaremos em um futuro próximo.
Neste momento, acabamos de aprender os conceitos básicos de um componente. Vamos reforçar cada um deles com este componente de exemplo!
Copiar
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Greeting;
Analisando o código acima, temos:
A declaração de um componente chamado Greeting .
O componente Greeting herda da classe Component da biblioteca react .
O componente Greeting descreve o que vai ser mostrado para quem usar a aplicação , declarado no método obrigatório render . Nesse caso, Greeting retorna: <h1>Hello, {this.props.name}</h1> .
O componente Greeting possui como propriedade um objeto chamado props , que contém todos os dados passados como parâmetro na hora de chamar um componente. Ou seja, chamar <Greeting name="Samuel" /> faz com que o componente tenha uma prop igual a { name: "Samuel" } .
Exportamos o componente Greeting de forma que ele possa ser reutilizado na aplicação.
