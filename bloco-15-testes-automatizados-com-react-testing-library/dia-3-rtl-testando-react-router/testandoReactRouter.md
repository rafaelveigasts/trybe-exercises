Testando React Router

Para começar a entender como fazer testes, precisamos passar por alguns pontos antes, entendê-los nos trará uma maior compreensão do que vamos realizar:

A biblioteca history é uma ferramenta que lhe permite acessar a sessão de histórico do navegador e também a localização atual (URL), onde quer que o JavaScript execute, nesse link https://reactrouter.com/web/api/history tem uma documentação de fácil consulta.

Na documentação acima, tem uma explicação sobre todos os métodos da biblioteca, mas para nossos testes, os métodos mais utilizados são o push , que te permite mudar de rota dentro do ambiente de testes , e o location.pathname , que te retorna a URL exata em que você está.

De dentro da biblioteca, você também importará a createMemoryHistory , que é feita para ser utilizada em ambientes que não possuem DOM, por exemplo, em testes automatizados. O trabalho dessa função é criar um novo histórico de navegação, para ser utilizado durante o teste. Essa biblioteca é bastante utilizada nesses casos, como veremos no próximo tópico.

A função renderWithRouter é uma função customizada para fazer testes com rotas, uma vez que a função render normal da RTL não dá suporte ao router . Ela pode ser muito útil e usa o createMemoryHistory para embutir no seu componente renderizado a lógica de histórico de navegação , para uso nos testes. Veja o código de exemplo https://testing-library.com/docs/example-react-router/#reducing-boilerplate para se familiarizar. Vamos praticar com um novo app React:

Primeiro, utilize o create-react-app com o nome que desejar.

Depois disso, vamos instalar as dependências que utilizaremos nesse projeto, a react-router-dom , history e a @testing-library/react , com o comando abaixo.

npm i react-router-dom

Por último vamos copiar esse código para dentro do nosso arquivo App.js apagando tudo o que já estiver lá.

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export const About = () => <h1>Você está na página Sobre</h1>;
export const Home = () => <h1>Você está na página Início</h1>;
export const NoMatch = () => <h1>Página não encontrada</h1>;

export default function App() {
  return (
    <div>
      <Link to="/">Início</Link>
      <br />
      <Link to="/about">Sobre</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

Repare que, para efeito de aprendizado, temos mais de um componente dentro do arquivo App.js , por isso o export default no componente App . Os outros componentes, que estão sendo exportados acima do component App , também terão os seus respectivos exports . Lembrando que isso não é uma boa prática . Estamos fazendo dessa forma para diminuirmos a complexidade da aplicação, com o intuito de facilitar o entendimento.

Outro ponto de atenção é que, quando utilizamos o export default e o export , a maneira de importar os componentes sofre uma pequena alteração - que veremos na hora de realizar os testes.

Ao terminar de instalar, vamos nos deparar com um problema! A nossa página dará o seguinte erro:

You should not use <Link> outside a <Router>

Esse erro acontece porque o BrowserRouter deve encapsular todos os itens chamados pelo react-router-dom e, no nosso caso, existem dois <Link> no App.js , o que nos leva a esse erro. Vamos resolver isso colocando a tag <BrowserRouter> no arquivo index.js , deixando ele da seguinte forma:

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
