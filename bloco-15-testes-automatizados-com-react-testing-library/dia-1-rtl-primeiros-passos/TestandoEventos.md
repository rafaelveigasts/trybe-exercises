Testando eventos

Por enquanto estamos apenas testando se as coisas estão sendo renderizadas, mas precisamos testar o comportamento do usuário, como um clique em um botão. Para isso se usa o fireEvent . Ele pode ser usado para simular os eventos capturados pelos event listeners dos elementos, como change , keyDown , click e outros. A lista completa de eventos suportados pelo fireEvent é essa . Modificaremos nosso App.js para quem usa poder inserir o seu email no campo, salvá-lo e mostrá-lo na tela:

Observe as mudanças que foram feitas.
Rode a aplicação e a teste à mão, adicionando seu email no campo e clicando no botão de enviar. Veja se seu email foi salvo.
Agora iremos automatizar cada passo que você fez no código usando os fireEvent , para não ter que toda vez que mudar o código precisar testar a mão cada passo desses. Bastará, ao invés disso, apenas rodar o npm test . Observe cada linha do teste:

  // App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      saveEmail: '',
    };
  }

  changeEmail(value) {
    this.setState({ email: value });
  }

  changeSaveEmail(value) {
    this.setState({ saveEmail: value, email: '' });
  }

  render() {
    const { email, saveEmail } = this.state;
    return (
      <div className="App">
        <label htmlFor="id-email">
          Email
        </label>
        <input
          id="id-email"
          value={email}
          type="email"
          onChange={(e) => this.changeEmail(e.target.value)}
        />
        <input
          id="btn-enviar"
          type="button"
          data-testid="id-send"
          value="Enviar"
          onClick={() => this.changeSaveEmail(email)}
        />
        <input id="btn-id" type="button" value="Voltar" />
        <h2 data-testid="id-email-user">{`Valor: ${saveEmail}`}</h2>
      </div>
    );
  }
}

export default App;

Observe as mudanças que foram feitas.
Rode a aplicação e a teste à mão, adicionando seu email no campo e clicando no botão de enviar. Veja se seu email foi salvo.
Agora iremos automatizar cada passo que você fez no código usando os fireEvent , para não ter que toda vez que mudar o código precisar testar a mão cada passo desses. Bastará, ao invés disso, apenas rodar o npm test . Observe cada linha do teste:

// modifique o import abaixo
import { render, fireEvent } from '@testing-library/react';

// Adicione esse teste.
test('Verificando se o botão e o campo email estão funcionando.', () => {
  const { getByTestId, getByLabelText } = render(<App />);

  const EMAIL_USER = 'email@email.com';

  const textEmail = getByTestId('id-email-user');
  expect(textEmail).toBeInTheDocument();
  expect(textEmail).toHaveTextContent('Valor:');

  const btnSend = getByTestId('id-send');
  const inputEmail = getByLabelText('Email');
  fireEvent.change(inputEmail, { target: { value: EMAIL_USER } });
  fireEvent.click(btnSend);
  expect(inputEmail).toHaveValue('');
  expect(textEmail).toHaveTextContent(`Valor: ${EMAIL_USER}`);
});

Passo a passo:
Primeiro renderizamos a aplicação, depois salvamos o email do usuário em uma variável (o que é uma boa prática).
Depois, verificamos se o h2 onde o email aparece na tela está apenas com o texto Valor: ,
Depois procuramos pelo o campo de email e o botão que enviará os dados.
Simulamos a digitação do usuário no campo de email com o fireEvent.change(inputEmail, { target: { value: EMAIL_USER } }); . Quando se passa um segundo parâmetro para a função fireEvent.change estamos adicionando valores às propriedades do evento, nesse caso adicionamos o valor 'email@email.com' ao event.target.value .
Simulamos um clique no botão com o fireEvent.click(btnSend) , o que simula o clique de quem usa no botão.
Verificamos o campo de email se está vazio e se o h2 onde o valor do email deveria aparecer tem o conteúdo desejado, que é Valor: email@email.com .
