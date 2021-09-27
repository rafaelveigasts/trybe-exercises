Introdução ao RTL

No conteúdo de testes já visto no curso, funções eram testadas. Já no RTL o objetivo é testar comportamento, como se algo aparece ou não na tela. Por exemplo:

Podemos testar se a nossa página possui um título específico (igual aos requisitos que se pedem no projeto!);

Em uma lista de tarefas, como o projeto Todo list , precisamos verificar, por exemplo, se a funcionalidade de adicionar uma nova tarefa funciona. Para isso, devemos simular o comportamento de quem usa, que seria adicionar um texto no campo de texto alvo e clicar no botão que adiciona a nova tarefa. Para testar se funcionou, verificamos se o texto aparece em algum lugar da página. O RTL nos dá as ferramentas necessárias para realizar essa simulação!

Esses são apenas alguns dentre muitos exemplos! Agora veremos a estrutura desses testes e suas ferramentas:

Crie uma nova aplicação com o comando npx create-react-app testes-react .
Não se preocupe! A biblioteca RTL já vem instalada nos novos projetos.
Abra a aplicação no VSCode e abra o arquivo App.test.js . Ele está dentro do diretório src .
Observe o arquivo App.test.js :

O que ele está fazendo é verificar se algum elemento dentro do componente App possui o texto "learn react". Para rodar os testes vá para a pasta src , e execute npm test .
Caso apareça a mensagem abaixo basta clicar a tecla "a".

Após clicar a tecla "a", esse deve ser o resultado:

Após clicar a tecla "a", esse deve ser o resultado:

Como pode ver, o nosso único teste passou. Quer dizer que existe o texto "learn react" dentro do componente App ! Se rodar aplicação com o npm start , você encontrará o texto "learn react", conforme indicado pelo teste.
Agora vamos provocar um erro ou uma falha. Mude o texto "learn react" para "algo que não aparece" e rode o teste. Seu terminal acusará este erro:

Ele está falando que não foi possível encontrar um elemento que possui o texto "/algo que não aparece/i".
Dê uma olhada na cheatsheet https://testing-library.com/docs/react-testing-library/cheatsheet/ da react-testing-library . Ela explica de forma resumida como a biblioteca funciona. Nos aprofundaremos nas explicações ao longo deste bloco!
💡 Você ja reparou no arquivo setupTests.js ? Por padrão ele é criado junto ao comando npx create-react-app , dentro dele temos comentários e uma importação, essa importação fornece para nossos testes o que chamamos de custom jest matchers . O .toBeInTheDocument() no exemplo acima é um deles, e você pode consultar outros na documentação do jest-dom  https://github.com/testing-library/jest-dom sempre que precisar.

Agora veremos cada parte do código para entender como que a biblioteca de teste funciona. Para testar uma aplicação precisamos seguir alguns passos:

Renderização
Testar um componente significa, em poucas palavras, renderizá-lo um browser real ou numa simulação de um browser e testar nele o comportamento desejado. Na RTL , é necessário o uso da função render() para fazer isso. Ela simula a renderização de um componente e retorna um objeto com alguns métodos para que se possa simular interações com esse componente. Para ver melhor modifique o teste do arquivo App.test.js :

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const meuApp = render(<App />);
  const linkElement = meuApp.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

Modificamos a linha que utiliza render (linha 5 do código acima), ela não está mais realizando o object destructuring . Estamos agora salvando todo o conteúdo retornado do render para a variável meuApp .
Agora, para usar o seletor/query getByText , precisamos usar o meuApp.getByText . Observe que ele é muito parecido com os seletores do DOM, como o document.getElementById() ou document.querySelector() . Seguindo a mesma lógica, ao usar o meuApp.getByText() , ele retornará um elemento html.
Para não ter que sempre salvar o retorno da função do render podemos realizar o object destructuring no retorno do render() . Como segue abaixo:
