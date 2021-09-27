Testando apenas um componente.
Agora imagine que está escrevendo teste para a aplicação, mas precisa apenas testar um componente que você criou ou vai criar. Não precisamos renderizar toda a nossa aplicação para realizar um teste: podemos renderizar apenas aquele componente específico e criar os testes para ele.
Usaremos a mesma aplicação anterior e criaremos um componente que mostra se o email é valido ou não. Crie o componente ValidEmail.js :

import React from 'react';

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
};

const ValidEmail = (props) => {
  const { email } = props;
  return (
    <div>
      <h2 data-testid="id-email-user">{`Valor: ${email}`}</h2>
      <h3>{(verifyEmail(email) ? 'Email Valido' : 'Email Inválido')}</h3>
    </div>
  );
};

export default ValidEmail;

Substitua uma linha no App.js , e não esqueça de importar o ValidEmail para o App.js :

<h2 data-testid="id-email-user">{`Valor: ${saveEmail}`}</h2>
// Substitua a linha de cima pela a debaixo.
<ValidEmail email={saveEmail}/>

Rode os testes e observe que mesmo sem mudar nenhum teste, todos eles passaram, assegurando que nossa aplicação continua funcionando mesmo após essa mudança (super conveniente, certo?!).

Agora falta testar essa funcionalidade nova que adicionamos. Mas testaremos apenas renderizando o nosso componente ValidEmail . Crie um arquivo ValidEmail.test.js .

import React from 'react';
import { render } from '@testing-library/react';
import ValidEmail from './ValidEmail';

test('Testando um componente, caso o email seja valido.', () => {
  const EMAIL_USER = 'email@email.com';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Valido');
  expect(isValid).toBeInTheDocument();
});

Observe que a estrutura é bem parecida com a dos outros testes. O que foi modificado é o que está sendo renderizado. No lugar de render(<App />) , colocamos render(<ValidEmail email={EMAIL_USER} />) . O componente que queremos renderizar precisa de uma props para funcionar, portanto precisamos passar um valor para ela, que no caso é email={EMAIL_USER} . O teste verifica se, com a prop passada, o nosso teste passará.
Como já estamos testando o caso do email valido, precisamos criar o teste que cobre o cenário do email ser inválido. Para isso, basta copiar o teste anterior e criar um novo, além de mudar o valor que passaremos para a prop e o nome que buscamos para 'Email Invalido' ou algo parecido. Adicione o teste abaixo e rode os testes:

test('Testando um componente, caso o email seja inválido.', () => {
  const EMAIL_USER = 'emailerrado';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Inválido');
  expect(isValid).toBeInTheDocument();
});

Agora, para você começar a fixar o assunto, faça o seguinte exercício: adicione novas funcionalidades a esse componente, como não aparecer a mensagem caso nenhum email ainda tenha sido enviado, e realize os testes para ela. Pode usar o .not para negar o expect ( .not.toBeInTheDocument() ). Adicione uma funcionalidade que muda a cor do texto caso seja valido ou invalido o email.

