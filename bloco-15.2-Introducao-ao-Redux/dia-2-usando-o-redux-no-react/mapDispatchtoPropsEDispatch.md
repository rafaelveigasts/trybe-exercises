mapDispatchToProps e dispatch
Agora, vamos à implementação do componente SecondComponent .

//actions.js

export const newAction = (state) => ({ type: 'NEW_ACTION', state });

--------------

import React from 'react';
import { connect } from 'react-redux';
import { newAction } from './actions';
// Import referente a `action creator` criada para disparar a ação para a store.

class SecondComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    // Esse estado irá armazenar o valor do input
  }

  render() {
    const { myFirstDispatch } = this.props
    return (
      <div>
        <input
          type="text"
          onChange={event => this.setState({ inputValue: event.target.value })}
        />
        <button onClick={() => this.props.myFirstDispatch(this.state.inputValue)}> /
          Executar qualquer tarefa
        </button>
    // O botão está disparando o mapDispatch e enviando o valor para a store
      </div>
    );
  }
}

// utilizando `action`:
// const mapDispatchToProps = (dispatch) => ({
  // myFirstDispatch: (state) => dispatch({ type: 'NEW_ACTION', state }),
// });

// No caso acima, vemos que o mapDispatchToProps é uma função que retorna um objeto, e sua key recebe uma callback.
// Essa callback terá um parâmetro correspondente ao estado que será enviado para a store.
// Nessa callback, chamamos a função `dispatch`, que receberá como argumento a `action`,
// que é um objeto contendo o "type" e o parametro da callback, o "state", que será o novo valor do estado.


// utilizando `action creator `:

const mapDispatchToProps = (dispatch) => ({
  myFirstDispatch: (state) => dispatch(newAction(state))});

// Podemos utilizar o mapDispatchToProps de outra forma também! Lembra do arquivo que foi criado contendo a função "newAction?
// No exemplo acima, o dispatch está recebendo como argumento a "newAction", que também é chamada de `action creator`.
// E é aí que está a vantagem de utilizar  as `action creator`, pois elas também geram uma `action`.

export default connect(null, mapDispatchToProps)(SecondComponent);

---------------


// reducers/myReducer.js

const INITIAL_STATE = {
  state: '',
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_ACTION':
      return { state: action.state };
      // Nesse caso a utilização do spread operator (...) não é necessário, pois estamos trabalhando com uma única chave no estado.
      // Mas caso tenha dúvidas sobre a utilização, consulte a documentação do Redux https://redux.js.org/recipes/using-object-spread-operator
    default:
      return state;
  }
}

export default myReducer;

------------------


// reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './myReducer';

const rootReducer = combineReducers({ myReducer });

export default rootReducer;

----------------

O dispatch é uma função da Redux store. Lembra que você precisa chamar uma store.dispatch para despachar uma ação com JavaScript puro? Então, o mapDispatchToProps tem acesso à essa função da store, e é através dela que você conseguirá enviar a ação para alterar o estado da aplicação .

Vamos passar por cada parte do componente para explicar seu funcionamento:

Primeiro, nós estamos definindo um estado interno do componente chamado inputValue . Note que, apesar de estarmos usando o Redux , que centraliza os states , caso haja algum estado o qual não necessite navegar entre outros componentes, podemos declará-lo internamente.

Estamos criando um input para o usuário digitar a tarefa que deseja executar. A cada mudança no valor do input, o valor é salvo no estado inputValue .

Um botão com a propriedade onClick foi criado, passando a função myFirstDispatch que está presente na props . Mas como isso foi parar lá? Veremos agora:

A função mapDispatchToProps é a responsável por disparar - fazer o dispatch de - uma ação para o reducer .

Para termos acesso às funcionalidades do Redux, seja a de ler os dados ou manipulá-los, precisamos acessá-las como props de um componente. Por isso, como explicitado no nome da função, o mapDispatchToProps mapeia os dispatchs para o props .

Note que no início do arquivo estamos importando a action newAction , criada anteriormente. No caso, estamos nomeando uma propriedade chamada myFirstDispatch , que faz o dispatch da action newAction com um parâmetro.

Outra observação importante é que as estruturas dos métodos mapStateToProps e mapDispatchToProps sempre serão as mesmas, o que mudará são as propriedades que vamos acessar ou actions que vamos disparar.O dispatch é uma função da Redux store. Lembra que você precisa chamar uma store.
dispatch para despachar uma ação com JavaScript puro? Então, o mapDispatchToProps tem acesso à essa função da store, e é através dela que você conseguirá enviar a ação para alterar o estado da aplicação .

Vamos passar por cada parte do componente para explicar seu funcionamento:

Primeiro, nós estamos definindo um estado interno do componente chamado inputValue . Note que, apesar de estarmos usando o Redux , que centraliza os states , caso haja algum estado o qual não necessite navegar entre outros componentes, podemos declará-lo internamente.

Estamos criando um input para o usuário digitar a tarefa que deseja executar. A cada mudança no valor do input, o valor é salvo no estado inputValue .

Um botão com a propriedade onClick foi criado, passando a função myFirstDispatch que está presente na props . Mas como isso foi parar lá? Veremos agora:

A função mapDispatchToProps é a responsável por disparar - fazer o dispatch de - uma ação para o reducer .

Para termos acesso às funcionalidades do Redux, seja a de ler os dados ou manipulá-los, precisamos acessá-las como props de um componente. Por isso, como explicitado no nome da função, o mapDispatchToProps mapeia os dispatchs para o props .

Note que no início do arquivo estamos importando a action newAction , criada anteriormente. No caso, estamos nomeando uma propriedade chamada myFirstDispatch , que faz o dispatch da action newAction com um parâmetro.

Outra observação importante é que as estruturas dos métodos mapStateToProps e mapDispatchToProps sempre serão as mesmas, o que mudará são as propriedades que vamos acessar ou actions que vamos disparar.
O mapDispatchToProps , assim como o mapStateToProps , podem ser criados via funções convencionais ou arrow functions. O que é indispensável é que o retorno seja um objeto, pois é assim que o Redux o espera.

Lembre-se: a única maneira de enviarmos uma action para um reducer é fazendo seu dispatch .
Por último, para conectar o Redux ao componente, é preciso importar o método connect .

Acesse a branch exercise-7 para praticar a criação do mapDispatchToProps e do dispatch. Você deverá visualizar o diretório missing_mapdispatchtoprops, essa é a nossa aplicação react-redux que precisará da implementação do mapDispatchToProps e do dispatch . Siga o passo a passo do arquivo README.md .

Pronto! Essa é uma aplicação com react-redux pronta com todas as suas peças funcionando. Note que a estrutura pura do Redux se baseia em: store , actions e reducers . Já a estrutura de conexão entre o React e o Redux é composta por: provider , connect , dispatch , mapDispatchToProps e mapStateToProps . Essas são as principais ferramentas que constituem a estrutura react-redux .
Para fixar

Lembre-se: a única maneira de enviarmos uma action para um reducer é fazendo seu dispatch .
Por último, para conectar o Redux ao componente, é preciso importar o método connect .

Acesse a branch exercise-7 para praticar a criação do mapDispatchToProps e do dispatch. Você deverá visualizar o diretório missing_mapdispatchtoprops, essa é a nossa aplicação react-redux que precisará da implementação do mapDispatchToProps e do dispatch . Siga o passo a passo do arquivo README.md .

Pronto! Essa é uma aplicação com react-redux pronta com todas as suas peças funcionando. Note que a estrutura pura do Redux se baseia em: store , actions e reducers . Já a estrutura de conexão entre o React e o Redux é composta por: provider , connect , dispatch , mapDispatchToProps e mapStateToProps . Essas são as principais ferramentas que constituem a estrutura react-redux .
Para fixar

git checkout exercise-7

Agora que você entendeu o funcionamento de todas as peças do react-redux, vamos assistir a pŕoxima aula que mostrará uma aplicação funcionando com todas as peças integradas.


Agora que aprendemos como encaixar as peças, você já sabe como utilizar o Redux no React! Aproveite para observar o comportamento do estado utilizando a extensão do navegador Redux Devtools mencionada anteriormente no início deste bloco.

// src/actions/index.js
const addAssignment = (value) => ({ type: 'ADD_ELEMENT', value });

export default addAssignment;

________________

// src/reducers/index.js
const INITIAL_STATE = [];

function listReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.value];
    default:
      return state;
  }
}

export default listReducer;

____________________

// src/store/index.js
import { createStore, combineReducers } from 'redux';
import listReducer from '../reducers';

const rootReducer = combineReducers({ listReducer });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // A linha acima não é obrigatória, serve apenas para visualizar
  // a extensão "Redux Devtools", caso você tenha instalado.
);

export default store;
_______________________

// src/InputsList.js
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addAssignment from './actions';

class InputsList extends React.Component {
  constructor() {
    super();
    this.state = { textValue: '' };
  }

  render() {
    const { add } = this.props;
    const { textValue } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Digite a tarefa"
          onChange={ (event) => this.setState({ textValue: event.target.value }) }
        />
        <button type="button" onClick={ () => add(textValue) }>
          Adicionar Tarefa
        </button>
      </div>
    );
  }
}

InputsList.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchtoProps = (dispatch) => ({
  add: (value) => dispatch(addAssignment(value))
});

export default connect(null, mapDispatchtoProps)(InputsList);

______________________________

// src/List.js
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class List extends React.Component {
  render () {
    const { list } = this.props;

    return (
      <div>
        <div>
          {list.map((element, index) => <p key={ index }>{element}</p>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.listReducer});

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default connect(mapStateToProps)(List);

__________________________

// src/App.js
import React from 'react';
import InputsList from './InputsList';
import List from './List';

function App() {
  return (
    <div>
      <InputsList />
      <List />
    </div>
  );
}

export default App;

____________________________

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);