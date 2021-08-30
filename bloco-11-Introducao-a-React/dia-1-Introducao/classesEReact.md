**Classes e React**

Talvez você já tenha percebido, mas a principal diferença entre o uso de componentes por classe e o uso de componentes por função reside no fato daqueles gerados por classe terem acesso a métodos e ao estado próprios de qualquer componente React gerado via classe, como o método render() , que te permite renderizar todo o conteúdo criado na tela, os quais são acessíveis somente por componentes criados por classe na maior parte das versões do React. A sintaxe para criar um componente com classes é a seguinte:

import React from 'react';

class ReactClass extends React.Component {
  render() {
    return (
      <h1>My first React Class Component!</h1>
    )
  }
}

Para fixar tudo o que você aprendeu siga os passos à seguir para criar o seu primeiro componente React de classe:

Crie um novo projeto utilizando npx create-react-app nome-app

⚠️ Substitua o nome-app pelo que você desejar para seu app ⚠️

Na pasta src , acesse App.js e remova todo o conteúdo da função App , de modo que ela fique assim:

    import React from 'react';
    import logo from './logo.svg';
    import './App.css';

    function App() {
      return ();
    }

    export default App;

Na pasta src , crie um arquivo chamado Component.js crie um componente que retorne um <h1> com o seu nome um paragráfo, <p> , com uma breve descrição sobre você.

Lembre-se, quando vamos retornar mais de um elemento é preciso que eles estejam dentro de um <div> .

Importe seu componente em App.js de modo que ele seja renderizado na tela quando a aplicação for iniciada, npm start .

Para isso você precisará utilizar o export default para exportar seu componente, o export default é sempre utilizado quando queremos exportar apenas um elemento de um arquivo, seja uma função, um componente ou uma variável. A penúltima linha do arquivo Component.js deverá ficar da seguinte forma:
