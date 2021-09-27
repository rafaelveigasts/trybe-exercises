Testando inputs em React

Agora, vamos falar um pouco sobre teste de formulários, que são um pouco diferentes do resto da página porque normalmente os componentes já estão em tela no momento do carregamento mas os valores do input não estão. Então precisamos, nos testes, interagir com o input como o usuário faria para poder testá-lo corretamente.

Vamos primeiro criar dois campos de texto, um para digitar nome e outro para digitar e-mail.

No arquivo App.js de sua aplicação react coloque o código abaixo e veja no navegador e no console dele como funciona:

import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
  }

  handleInput(e) {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1>Teste de inputs</h1>
        <p>
          Nome:
          <input
            onChange={(e) => this.handleInput(e)}
            name='nome'
            value={this.state.nome}
          />
        </p>
        <p>
          E-mail:
          <input
            onChange={(e) => this.handleInput(e)}
            name='email'
            value={this.state.email}
          />
        </p>
      </div>
    );
  }
}

export default App;

Agora, vamos testar se esses componentes estão na tela corretamente, e se conseguimos digitar valores neles no teste. Para nos ajudar a identificar os campos, é interessante utilizar a propriedade data-testid nos inputs , como veremos a seguir. Coloque as propriedades e depois começaremos os testes:

<p>
//  Nome:
//  <input
//    onChange={(e) => this.handleInput(e)}
//    name='nome'
      data-testid='input-nome'
//    value={this.state.nome}
//  />
//  </p>
//  <p>
//  E-mail:
//  <input
//    onChange={(e) => this.handleInput(e)}
//    name='email'
      data-testid='input-email'
//    value={this.state.email}
//  />
</p>

Agora vamos escrever o test para os dois campos. A estrela aqui é o fireEvent , que dispara um evento sobre o componente renderizado, que no nosso caso será o change .

Vamos escrever o teste, ele vai interagir com os inputs, colocar valores neles, assim como quem navegar pela página faria. Depois, vamos testar se o que for digitado aparece na página.

// App.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import App from './App';
it('alterando o valor dos campos e testando o valor guardado', () => {
  const { getByTestId } = render(<App />);
  const inputNome = getByTestId('input-nome');
  expect(inputNome).toHaveValue('');
  fireEvent.change(inputNome, { target: { value: 'Estudante da Trybe' } });
  expect(inputNome).toHaveValue('Estudante da Trybe');

  const inputEmail = getByTestId('input-email');
  expect(inputEmail).toHaveValue('');
  fireEvent.change(inputEmail, { target: { value: 'estudante@trybe.com' } });
  expect(inputEmail).toHaveValue('estudante@trybe.com');
});

No código, vemos como utilizar o fireEvent . Para isso, temos que passar para ele o que queremos escrever dentro do input durante o teste. A sintaxe parece estranha, mas é simplesmente porque nós temos um item (que estamos selecionando com o data-testid ) e a propriedade dele que guarda o valor digitado no input fica dentro da propriedade target. Dá para fazer um paralelo bem interessante aqui com o eventListener que aprendemos no começo de JavaScript , onde utilizávamos o valor de event.target.value . Por conta disso que a sintaxe é de objeto dentro de objeto.

Uma coisa que pode ajudar a entender o que está acontecendo é O console.log na função handleInput do arquivo App.js exibindo a variável value . Fazendo isso, o console.log aparece no teste, o que lhe dará a certeza de que a RTL está realmente renderizando sua página e inserindo nos campos os valores, da mesma forma que o usuário faria.

Para visualizar o comportamento dos testes acima basta ter uma aplicação react e substituir o arquivo App.js e App.test.js .
