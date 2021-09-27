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
