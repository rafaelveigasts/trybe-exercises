// App.js
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      joke: '',
    }
  }

  componentDidMount() {
    const API_URL = 'https://icanhazdadjoke.com/';
    fetch(API_URL, { headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((data) => this.setState({ joke: data.joke }));
  }

  render() {
    return (
      <div className="App">
        {this.state.joke}
      </div>
    );
  }
}

export default App;

Teste se sua aplicação tem o funcionamento correto no navegador retornando uma piada aleatória a cada vez que a pagina é atualizada.
Agora temos o problema, como testar a aplicação sem que quebre toda vez que nossa api retornar uma nova piada diferente? 🤔
Para resolver esse problema, vamos ver dois exemplos com o Jest que vão nos permitir mockar , respectivamente, um módulo e sua implementação.

Exemplo 1
Substitua o arquivo App.test.js pelo conteúdo abaixo:

// App.test.js
import React from 'react';
import { render } from '@testing-library/react'
import App from './App';

afterEach(() => jest.clearAllMocks());
it('fetch joke', async () => {
  const joke = {
    id: '7h3oGtrOfxc',
    joke: 'Whiteboards ... are remarkable.',
    status: 200,
  };

  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(joke),
  });

  const { findByText } = render(<App />);
  await findByText('Whiteboards ... are remarkable.');
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith(
    'https://icanhazdadjoke.com/',
    {"headers": {"Accept": "application/json"}}
  );
});

Vamos em partes entender o que esta acontecendo:

A constante joke cria um objeto similar ao que é retornado da API ;
O jest.spyon espiona as chamadas a função fetch do objeto global , é por meio deste objeto global que conseguimos usar qualquer função do sistema, por exemplo a função parseInt ;
Quando a função fetch for chamada, ao invés de fazer uma requisição a uma API externa será chamando nosso mock . Repare que para cada .then utilizamos .mockResolvedValue e simulamos o retorno que o fetch teria, primeiro retornamos um objeto que contem a função .json e dentro dela criamos um mock que retorna a nossa piada, satisfazendo o que é esperado no nosso componente;
É importante termos o async em it('fetch joke', async () => { , para que se possa utilizar await findByText onde estamos dizendo ao nosso teste: ei espere até que consiga encontrar esse texto no dom ou de erro por limite de tempo ;
As funções toBeCalledTimes e toBeCalledWith servem para garantir respectivamente, o número de chamadas ao nosso fetch e que ele foi chamado com os argumentos corretos.
A linha afterEach(() => jest.clearAllMocks()); faz com que, após cada teste, nosso mock seja limpo, ou seja, no caso acima, garante que após o teste o fetch não seja mais um mock , isso é bem util para que não tenha interferência entre um teste e outro.


Exemplo 2
Existem diversas formas de mockagem , você se lembra que a função fetch é uma Promise ? Que vantagem isso traz dentro dos testes? Veja no código abaixo:

import React from 'react';
import { render } from '@testing-library/react'
import App from './App';

afterEach(() => jest.clearAllMocks());
it('should fetch users', async () => {
  const joke = {
    id: '7h3oGtrOfxc',
    joke: 'Whiteboards ... are remarkable.',
    status: 200,
  };

  global.fetch = jest.fn(()=>
  Promise.resolve({
    json: ()=> Promise.resolve(joke)
  }));

  const { findByText } = render(<App />);
  await findByText('Whiteboards ... are remarkable.');
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith(
    'https://icanhazdadjoke.com/', 
    {"headers": {"Accept": "application/json"}}
    );
});

O código é muito similar ao do primeiro exemplo, alterando somente o mock .

Nesse exemplo estamos dizendo que global.fetch agora é uma função mockada com jest.fn que retorna uma Promise , e na primeira vez que ela for resolvida, deve se retornar um objeto com uma outra função json que também é uma Promise , que quando resolvida retorna sua piada.

Outra forma de escrever o mesmo exemplo seria com a sintaxe async/await , onde temos o mock dessa forma:

global.fetch = jest.fn(async () => ({
  json: async () => joke
}));

Mockar requisições é uma coisa realmente complexa mas, Palma, palma, não priemos cânico , você pode revisitar o conteúdo sempre que precisar e com o tempo e prática, estará fazendo mocks como se não fosse nada.
Nestes casos, utilizamos o mock para evitar uma chamada externa à API, tornando o nosso teste mais rápido e confiável, retornando o resultado contido na constante joke . Imagine que a API saia do ar ou que perdemos acesso à internet enquanto o teste roda. O teste quebraria, apesar do seu código estar funcionando. Mockar a chamada à API evita esse tipo de problema. Outro ponto é que seus testes vão rodar mais rápido se você não fizer uma chamada real à API todas as vezes que você for rodar seu teste.
