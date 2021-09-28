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

Agora sim! Vamos ao navegador entender o que esse código está fazendo. Basicamente, o nosso código cria um router básico com duas páginas, a Home e a About , além de criar uma página de Not Found para quando a pessoa coloca uma URL que não existe.

Após isso, vamos usar a função renderWithRouter que é uma função helper ou assistente. Uma função helper executa uma tarefa específica e não depende de outras funções.

No nosso caso, a helper irá criar um histórico e renderizar o componente que iremos testar. Para não ficarmos sem contexto de onde essa função veio, ela foi tirada da documentação oficial da Testing Library que você pode encontrar aqui https://testing-library.com/docs/example-react-router#reducing-boilerplate . Vamos salvar a helper num arquivo src/renderWithRouter.js e entendê-la antes de escrevermos os testes:

//src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

export default renderWithRouter;

Aqui utilizaremos a biblioteca history para criar um histórico de navegação. A helper irá passar o histórico para o componente Router , e vai renderizar o componente que quisermos dentro dele, bastando apenas passar o componente como argumento quando a chamarmos.

Existe uma forma de fazer sem o helper , mas ela implica em escrever bem mais código. Esse link  https://testing-library.com/docs/example-react-router/ tem um exemplo muito parecido com o que estamos fazendo, a grande diferença é que lá eles não utilizam uma função auxiliar. Repare que a sintaxe que utilizaremos será bem parecida com a do site, com a diferença de verbosidade que no exemplo do link acima será bem maior.

Com a ajuda desta função, vamos escrever muito menos código na hora de testar, porque vai ser questão de chamar a renderWithRouter . Aqui, um detalhe de muita importância é que devemos colocar o <BrowserRouter /> encapsulando o componente <App /> inteiro.

Para fazermos isso, devemos colocá-lo no index.js . Isto é necessário porque queremos ter controle sobre o BrowserRouter nos testes e se ele está dentro do componente que vamos testar, nós perdemos o controle sobre ele.

Uma outra característica dessa função é que ela retorna tanto o componente que passamos como parâmetro, já encapsulado no router, quanto o histórico que geramos em si, o que também serve para nos levar a outras páginas com facilidade.

Agora que vimos o App que vamos testar e entendemos a função que vamos utilizar, iremos escrever os testes, dentro do arquivo src/App.test.js :

import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from './App';

it('deve renderizar o componente App', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Você está na página Início/);
  expect(home).toBeInTheDocument();
});

Aqui, fizemos os imports necessários: o próprio react , a helper e o componente que iremos testar.

Importamos o teste em si, que chama a helper passando o componente a ser renderizado. Nesse primeiro caso, mostraremos como renderizar a aplicação toda, fazendo um teste geral, depois vamos ver como renderizar um componente específico.

Continuando os testes, vamos clicar no link About em nossa aplicação e verificar se estamos na página correta.

// import React from 'react';
import { fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import App from './App';

// it('deve renderizar o componente App', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const home = getByText(/Você está na página Início/);
//   expect(home).toBeInTheDocument();
// });

it('deve renderizar o componente Sobre', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Sobre/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/Você está na página Sobre/);
  expect(aboutAll).toBeInTheDocument();
});

Com o fireEvent (que deve ser importado da @testing-library/react ), podemos interagir com os elementos da tela (nesse caso, vamos clicar no link Sobre ). Depois disso, utilizaremos o history.location.pathname para verificar se estamos na página correta e, por último, verificamos se o texto que aparece quando clicamos nesse link no navegador foi encontrado.

Agora que temos mais um caso de uso, é interessante colocar o describe, ele ajudará bastante na hora de separar os testes e numa eventual falha, saberemos qual teste falhou. Vamos colocá-lo abaixo: