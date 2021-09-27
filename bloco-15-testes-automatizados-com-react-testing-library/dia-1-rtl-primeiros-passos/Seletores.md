Seletores.

Seletores ou Queries são métodos que usamos para indicar ao RTL algum elemento da nossa aplicação e assim podermos realizar nossos testes e comparações.

Veremos agora algumas formas de buscar por algum elemento HTML. No exemplo foi visto apenas o getByText que busca por um elemento que possui um determinado texto.

Todos os seletores (queries) estão disponíveis nessa lista de queries  https://testing-library.com/docs/queries/about/ da react-testing-library , mas não é necessário ler toda a documentação! Use-a para tirar dúvidas ou procurar algum assunto específico. Veremos algumas queries durante a aula.

Mas como fazer para buscar um elemento que não possui um texto? Como um input? Para isso, existem outros seletores.

Queremos selecionar para o nosso teste um input de email, portanto vamos acrescentar um ao arquivo App.js :

    // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
    </div>
  );
}

export default App;

Mudamos a estrutura e adicionamos um campo email com uma label. Precisamos testar se ele está de fato aparecendo na tela. Como ele não possui um texto não podemos usar o getByText , mas podemos usar o getByLabelText , onde ele pegará o input de acordo com o texto da label que está associado a ele. Nesse caso o input está relacionado com a label Email .

    // App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

Como pode ver mudamos os expects também, verificando se o elemento é do tipo correto e se ele está na tela.
Mas e se um campo não tiver texto e nem label? Podemos usar o getByRole . Ele busca pelo atributo role. No caso de um botão, o role é definido pela propriedade type="button" . O role serve, por exemplo, para buscar por um elemento <button>Enviar<button/> ou <input type="button" value="Enviar" /> .
Adicione um botão ao App.js .

  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" value="Enviar" />
    </div>
  );
}

export default App;

Adicione ao arquivo de App.test.js o teste abaixo:

test('Verificando se existe um botão', () => {
  const { getByRole } = render(<App />);
  const btn = getByRole('button');
  expect(btn).toBeInTheDocument();
});

Agora adicione um novo botão na aplicação.

  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" value="Enviar" />
      <input id="btn-back" type="button" value="Voltar" />
    </div>
  );
}

export default App;

Rode os testes verá que ocorre um erro. O que acontece é que o getByRole espera apenas encontrar um elemento, mas acaba encontrando dois, o botão de Enviar e o de Voltar , pois os dois possuem o role button . Para resolver esse problema precisamos usar outro seletor, o getAllByRole , que armazenará todos os valores encontrados pelo seletor em um array. Para testar precisamos mudar o teste para:

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

// test('Verificando se existe um botão', () => {
//   const { getByRole } = render(<App />);
//   const btn = getByRole('button');
//   expect(btn).toBeInTheDocument();
// });

test('Verificando se existe dois botões', () => {
  const { getAllByRole } = render(<App />);
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(2);
});

Observe que usamos o tamanho do buttons para verificar se foram encontrados dois botões. Não precisamos apenas usar o .toBeInTheDocument para realizar a verificação de presença no documento!
Foi necessário comentar o nosso segundo teste para não ocorrer um erro. Vamos modifica-lo para verificar se existe um botão de enviar. Para isso usaremos a query getByTestId . Devemos, para usar esse seletor, adicionar uma propriedade ao nosso botão de enviar, o data-testid .


  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" data-testid="id-send" value="Enviar" />
      <input id="btn-back" type="button" value="Voltar" />
    </div>
  );
}

export default App;

O teste ficará assim:

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

test('Verificando se existe um botão de enviar', () => {
  const { getByTestId } = render(<App />);
  const btn = getByTestId('id-send');
  expect(btn).toBeInTheDocument();
  expect(btn.type).toBe('button');
  expect(btn).toHaveValue('Enviar');
});

test('Verificando se existe dois botões', () => {
  const { getAllByRole } = render(<App />);
  const btn = getAllByRole('button');
  expect(btn.length).toBe(2);
});

Buscamos o elemento pelo data-testid e depois verificamos se ele está na tela e se é um botão com o texto Enviar .
